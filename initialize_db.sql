CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image_url VARCHAR(255),
    video_url VARCHAR(255),
    meta_title VARCHAR(255),
    meta_description TEXT,
    tags VARCHAR(255),
    status ENUM('published', 'draft') NOT NULL,
    created_at TIM
