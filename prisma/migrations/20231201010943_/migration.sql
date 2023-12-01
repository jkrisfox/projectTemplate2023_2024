
INSERT INTO "User" ("name", "password", "email")
VALUES
('admin', '$2a$10$ApKSbcr80X.AvrZn5HhxY.59TkwXrUyUbz6ZHRXhSNJFoOGEyTSLe', 'admin@calpoly.edu');

INSERT INTO "User" ("name", "password", "email")
VALUES
('admin2', '$2a$10$ApKSbcr80X.AvrZn5HhxY.59TkwXrUyUbz6ZHRXhSNJFoOGEyTSLe', 'admin2@calpoly.edu');

INSERT INTO "User" ("name", "password", "email")
VALUES
('admin3', '$2a$10$ApKSbcr80X.AvrZn5HhxY.59TkwXrUyUbz6ZHRXhSNJFoOGEyTSLe', 'admin3@calpoly.edu');

INSERT INTO "PossibleFilters" ("filterType")
VALUES
('General'), 
('Discussions'), 
('Sports'), 
('Exercise'), 
('ASI'), 
('Events');


INSERT INTO "Post" ("postTitle", "postDescription", "authorId")
VALUES
('Title of Post 1', 'Description of Post 1', 1),
('Title of Post 2', 'Description of Post 2', 2),
('Title of Post 3', 'Description of Post 3', 3);
