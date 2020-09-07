import React, {useEffect, useState} from "react";
import {CommentGroup, Loader, Modal, Comment, Divider} from "semantic-ui-react";
import News from "../News";
import InfiniteScroll from 'react-infinite-scroller';
import CommentInput from "./CommentInput";
import {IComment} from "../../models/comments";
import {IAppState} from "../../models/IAppState";
import {loadNewsByIdRoutine, setCurrentNewsRoutine} from "../../sagas/news/routines";
import {connect, ConnectedProps} from "react-redux";

const ExpandedNews: React.FC<ExpandedNewsProps> = (
    {
        currentNews,
        isLoading,
        user,
        setCurrentNews,
        loadNews
    }) => {

    useEffect(() => {
       loadNews({ id: currentNews.id });
    }, [currentNews.id]);

    const initialComment: IComment = {
        id: "",
        body: "",
        newsId: currentNews.id,
        user
    };
    const [comment, setComment] = useState<IComment>(initialComment);

    const handleClose = () => {
        setCurrentNews({});
    };

    const handleCommentChange = (body: string) => {
       setComment({
           ...comment,
           body
       });
    };

    const handleSubmit = () => {
        console.log("saved");
    };

    const mapComments = (comment: IComment) => {
        return (
            <Comment>
                <Comment.Avatar src={comment.user.avatar} />
                <Comment.Author>{comment.user.username}</Comment.Author>
                <Comment.Metadata>
                    <div>{comment.createdAt}</div>
                </Comment.Metadata>
                <Comment.Text>{comment.body}</Comment.Text>
            </Comment>
        );
    };

    return (
        <Modal
            open={!!currentNews}
            onClose={handleClose}
        >
            <Modal.Content>
                <News item={currentNews} />
                <Divider />
                {currentNews.comments?.map(comment => mapComments(comment))}
                <CommentInput
                    value={comment.body}
                    onChange={handleCommentChange}
                    onSubmit={handleSubmit}
                />
            </Modal.Content>
        </Modal>
    );
};

const mapStateToProps = (state: IAppState) => ({
    currentNews: state.news.current.get,
    commentsList: state.news.current.get.comments,
    isLoading: state.news.current.isLoading,
    user: state.user.shortInfo
});

const mapDispatchToProps = {
    setCurrentNews: setCurrentNewsRoutine,
    loadNews: loadNewsByIdRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ExpandedNewsProps = ConnectedProps<typeof connector>;
export default connector(ExpandedNews);
