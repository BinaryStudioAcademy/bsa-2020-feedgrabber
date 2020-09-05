CREATE TABLE comments(
    id uuid NOT NULL PRIMARY KEY,
    body varchar(255) NOT NULL,
    news_id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp NOT NULL,
    FOREIGN KEY(news_id) REFERENCES news(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);
