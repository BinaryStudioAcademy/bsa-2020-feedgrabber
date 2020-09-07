import React from 'react';

export interface IEmojiProps {
    symbol: string;
}

const Emoji: React.FC<IEmojiProps> = ({symbol}) =>
    (<span className="emoji" role="img">
        {symbol}
    </span>
    );
export default Emoji;
