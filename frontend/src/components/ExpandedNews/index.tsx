import React, {useEffect, useState} from "react";
import {CommentGroup, Comment, Divider, Dropdown} from "semantic-ui-react";
import CommentInput from "./CommentInput";
import {IAppState} from "../../models/IAppState";
import {connect, ConnectedProps} from "react-redux";
import NewsItem from "../NewsItem/NewsItem";
import {applyReactionRoutine, loadCompanyFeedItemRoutine, reactOnNewsRoutine} from "../../sagas/companyFeed/routines";
import {ICompanyFeedItem} from "../../models/companyFeed/ICompanyFeedItem";
import UIContent from "../UI/UIContent";
import UIColumn from "../UI/UIColumn";
import UIPageTitle from "../UI/UIPageTitle";
import {deleteCommentRoutine, saveCommentRoutine, updateCommentRoutine} from "../../sagas/comments/routines";
import styles from "./styles.module.sass";
import {IComment} from "../../models/comments";
import {useTranslation} from "react-i18next";
import moment from 'moment-with-locales-es6';

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
    commentsCount: 0,
    reactions: []
};

const ExpandedNewsItem: React.FC<ExpandedNewsProps & { match }> = ({
        newsItem,
        isLoading,
        loadNews,
        saveComment,
        updateComment,
        deleteComment,
        reactOnNews,
        applyReaction,
        match
}) => {

    useEffect(() => {
        loadNews({ id: match.params.id });
    }, [loadNews, match.params.id]);

    const [t] = useTranslation();
    const [body, setBody] = useState('');
    const [updatingComment, setUpdatingComment] = useState<IComment>(null);

    const handleUpdatingCommentChange = (body: string) => {
        setUpdatingComment({
            ...updatingComment,
            body
        });
    };

    const handleUpdateCommentSubmit = () => {
        if (updatingComment.body) {
            updateComment(updatingComment);
        }
        setUpdatingComment(null);
    };

    const handleSubmit = () => {
        if (body) {
            saveComment({
                body,
                newsId: match.params.id
            });
            setBody("");
        }
    };

    return (
        <UIContent>
            <UIPageTitle title={""}/>
            <UIColumn wide >
                <NewsItem
                    item={newsItem ? newsItem : defaultItem}
                    applyReaction={applyReaction}
                    react={reactOnNews}
                />
                <Divider />
                <CommentGroup className={styles.comments}>
                    {newsItem?.comments?.map(comment => {
                        return !updatingComment || updatingComment.id !== comment.id
                        ? (
                            <Comment>
                                <Comment.Avatar src={comment.user.avatar} />
                                <Comment.Content>
                                    <Comment.Author>
                                        {comment.user.username}
                                        <Comment.Metadata>
                                        {moment(comment.createdAt).fromNow()}
                                        </Comment.Metadata>
                                        <Dropdown>
                                        <Dropdown.Menu size="sm" title="">
                                          <Dropdown.Item onClick={() => setUpdatingComment(comment)}>
                                              {t("Edit")}
                                          </Dropdown.Item>
                                          <Dropdown.Item onClick={() => deleteComment(comment.id)}>
                                              {t("Delete")}
                                          </Dropdown.Item>
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </Comment.Author>
                                    <Comment.Text>{comment.body}</Comment.Text>
                                </Comment.Content>
                            </Comment>
                        ) : (
                          <CommentInput
                              value={updatingComment.body}
                              onChange={handleUpdatingCommentChange}
                              onCancel={() => setUpdatingComment(null)}
                              onSubmit={handleUpdateCommentSubmit}
                              loading={isLoading}
                          />
                        );
                    })}
                </CommentGroup>
                <CommentInput
                    className={styles.commentInput}
                    value={body}
                    onChange={setBody}
                    onCancel={() => setBody("")}
                    onSubmit={handleSubmit}
                />
            </UIColumn>
        </UIContent>
    );
};

const mapStateToProps = (state: IAppState) => ({
    newsItem: state.companyFeed.current,
    isLoading: state.companyFeed.isLoading
});

const mapDispatchToProps = {
    loadNews: loadCompanyFeedItemRoutine,
    saveComment: saveCommentRoutine,
    updateComment: updateCommentRoutine,
    deleteComment: deleteCommentRoutine,
    reactOnNews: reactOnNewsRoutine,
    applyReaction: applyReactionRoutine
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type ExpandedNewsProps = ConnectedProps<typeof connector>;
export default connector(ExpandedNewsItem);
