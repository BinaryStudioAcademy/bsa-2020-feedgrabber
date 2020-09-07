import React, {FC, useState} from "react";
import styles from './styles.module.scss';
import {ICompanyFeedItem} from "../../models/companyFeed/ICompanyFeedItem";
import UICardBlock from "../UI/UICardBlock";
import "emoji-mart/css/emoji-mart.css";
import {Picker} from "emoji-mart";
import {Icon, Popup} from "semantic-ui-react";
import ReactionTile from "./ReactionTile";
import {useStomp} from "../../helpers/websocket.helper";
import {IUserShort} from "../../models/user/types";

export interface IReactionCreationDto {
    reaction: string;
    newsId: string;
}

export interface ICreatedReactionDto {
    reaction: string;
    newsId: string;
    user: IUserShort;
    toAdd: boolean;
}

export interface INewsItemProps {
    item: ICompanyFeedItem;

    react(reaction: IReactionCreationDto): void;

    applyReaction(reaction: ICreatedReactionDto): void;
}

const defaultNewsImage = "https://img.icons8.com/cotton/2x/news.png";

const NewsItem: FC<INewsItemProps> = ({item, react, applyReaction}) => {
    const onEmojiSelect = emoji => {
        react({reaction: emoji.native, newsId: item.id});
    };

    useStomp("react", m => {
        const reaction: ICreatedReactionDto = JSON.parse(m.body);
        if (reaction.newsId === item.id)
            applyReaction(reaction);
    }, true);

    return (
        <>
            <UICardBlock key={item.id}
                         className={styles.newsItemContainer}>
                <>
                    <img src={item.image ? item.image?.link : defaultNewsImage} alt='' height="200" width="180"/>
                    <div className={styles.detailesContainer}>
                        <div className={styles.mainContainer}>
                            <div className={styles.type}>{item.type}</div>
                            <div className={styles.title}>{item.title}</div>
                            <div className={styles.body}>{item.body}</div>
                        </div>
                        <div className={styles.authorContainer}>
                            {item.user.avatar
                                ? <img src={item.user.avatar} alt='avatar' height="50" width="50"/>
                                : <div/>
                            }
                            <div className={styles.detailesAuthorContainer}>
                                <div className={styles.userName}>{item.user.username}</div>
                                <div className={styles.date}>{item.createdAt}</div>
                            </div>
                        </div>
                    </div>
                </>
            </UICardBlock>
            <div className={styles.reactionsContainer}>
                {item.reactions.map(r =>
                    (
                        <ReactionTile newsId={item.id} react={react} item={r}/>
                    ))}
                <Popup
                    content={
                        <Picker
                            showSkinTones={false}
                            title={'React on news!'}
                            onSelect={onEmojiSelect}
                            set={'google'}
                        />
                    }
                    on='click'
                    pinned
                    trigger={
                        <div className={styles.addReaction}>
                            <Icon className={styles.icon} name={'smile outline'}/>
                            +
                        </div>}
                />
            </div>
        </>
    );
};

export default NewsItem;
