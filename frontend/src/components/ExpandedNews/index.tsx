import React, {useEffect, useState} from "react";
import {CommentGroup, Comment, Divider} from "semantic-ui-react";
import CommentInput from "./CommentInput";
import {IComment} from "../../models/comments";
import {IAppState} from "../../models/IAppState";
import {connect, ConnectedProps} from "react-redux";
import NewsItem from "../NewsItem/NewsItem";
import {loadCompanyFeedItemRoutine} from "../../sagas/companyFeed/routines";
import {ICompanyFeedItem} from "../../models/companyFeed/ICompanyFeedItem";
import UIContent from "../UI/UIContent";
import UIColumn from "../UI/UIColumn";
import UIPageTitle from "../UI/UIPageTitle";
import {saveCommentRoutine} from "../../sagas/comments/routines";
import moment from "moment";
import styles from "./styles.module.sass";

const defaultItem: ICompanyFeedItem = {
    id: "",
    title: "",
    body: "",
    type: "",
    createdAt: "",
    user: {
        id: "",
        username: ""
    },
    commentsCount: 0
};

const ExpandedNewsItem: React.FC<ExpandedNewsProps & { match }> = ({
        newsItem,
        loadNews,
        saveComment,
        match
}) => {

    useEffect(() => {
        loadNews({ id: match.params.id });
    }, [loadNews, match.params.id]);

    const initialComment = {
        id: "",
        body: "",
        newsId: match.params.id,
        user: null
    };
    const [comment, setComment] = useState<IComment>(initialComment);

    const handleCommentChange = (body: string) => {
       setComment({
           ...comment,
           body
       });
    };

    const handleSubmit = () => {
        if (comment.body) {
            saveComment(comment);
        }
    };

    return (
        <UIContent>
            <UIPageTitle title={""}/>
            <UIColumn wide >
                <NewsItem item={newsItem ? newsItem : defaultItem} />
                <Divider />
                <CommentGroup className={styles.comments}>
                    {newsItem?.comments?.map(comment => (
                        <Comment className={styles.comments}>
                            <Comment.Avatar src={comment.user.avatar} />
                            <Comment.Content>
                                <Comment.Author>
                                    {comment.user.username}
                                    <Comment.Metadata>
                                    {moment(comment.createdAt).fromNow()}
                                    </Comment.Metadata>
                                </Comment.Author>
                                <Comment.Text>{comment.body}</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    ))}
                </CommentGroup>
                <CommentInput
                    value={comment.body}
                    onChange={handleCommentChange}
                    onSubmit={handleSubmit}
                />
            </UIColumn>
        </UIContent>
    );
};

const mapStateToProps = (state: IAppState) => ({
    newsItem: state.companyFeed.current
});

const mapDispatchToProps = {
    loadNews: loadCompanyFeedItemRoutine,
    saveComment: saveCommentRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ExpandedNewsProps = ConnectedProps<typeof connector>;
export default connector(ExpandedNewsItem);
