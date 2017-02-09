INSERT INTO smartvote.question (text, tags) VALUES ('Jolie question de sa mère !!', null);
INSERT INTO smartvote.question (text, tags) VALUES ('Plop generated', null);
INSERT INTO smartvote.question (text, tags) VALUES ('Yolo Yellow !!', null);

INSERT INTO smartvote.answers (text) VALUES ('Oui');
INSERT INTO smartvote.answers (text) VALUES ('Non');
INSERT INTO smartvote.answers (text) VALUES ('Peut-être');

INSERT INTO smartvote.question_answer (question_id, answer_id, value) VALUES (4, 1, '0');
INSERT INTO smartvote.question_answer (question_id, answer_id, value) VALUES (4, 2, '0');
INSERT INTO smartvote.question_answer (question_id, answer_id, value) VALUES (4, 3, '1');
INSERT INTO smartvote.question_answer (question_id, answer_id, value) VALUES (5, 1, '0');
INSERT INTO smartvote.question_answer (question_id, answer_id, value) VALUES (5, 2, '1');
INSERT INTO smartvote.question_answer (question_id, answer_id, value) VALUES (6, 1, '1');
INSERT INTO smartvote.question_answer (question_id, answer_id, value) VALUES (6, 2, '0');