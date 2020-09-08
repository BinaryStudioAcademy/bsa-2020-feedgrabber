import React, {FC} from "react";
import {Label, Popup} from "semantic-ui-react";
import Emoji from "../../UI/Emoji/Emoji";
import styles from "./styles.module.scss";
import {IReaction} from "../../../models/companyFeed/ICompanyFeedItem";
import {IReactionCreationDto} from "../NewsItem";

export interface IReactionTileProps {
    item: IReaction;
    newsId: string;

    react(reaction: IReactionCreationDto): void;
}

const ReactionTile: FC<IReactionTileProps> = ({item, react, newsId}) => {

    const onReactionClick = () => {
        react({newsId: newsId, reaction: item.emoji});
    };

    return (
        <Popup
            inverted
            content={item.reactedUsers
                .map(r => r.firstName && r.lastName ? `${r.firstName} ${r.lastName}` : r.username)
                .join(' , ')
            }
            on='hover'
            pinned
            closeOnDocumentClick
            style={{opacity: 0.7}}
            trigger={
                <Label className={`${styles.label} ${item.reactedByCurrentUser ? styles.reacted : ""}`}
                       onClick={onReactionClick}><Emoji
                    symbol={item.emoji}/> {item.reactedUsers.length}</Label>}/>
    );
};

export default ReactionTile;
