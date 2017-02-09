INSERT INTO smartvote.question  VALUES (4, 'Jolie question de sa mère !!', '["ES6", "Angular2", "SF3"]');
INSERT INTO smartvote.question VALUES (5, 'Plop generated', '["VueJS", "SF3"]');
INSERT INTO smartvote.question VALUES (6, 'Yolo Yellow !!', null);

INSERT INTO smartvote.answers VALUES (1, 'Oui');
INSERT INTO smartvote.answers VALUES (2, 'Non');
INSERT INTO smartvote.answers VALUES (3, 'Peut-être');

INSERT INTO smartvote.question_answer (question_id, answer_id, value) VALUES (4, 1, '0');
INSERT INTO smartvote.question_answer (question_id, answer_id, value) VALUES (4, 2, '0');
INSERT INTO smartvote.question_answer (question_id, answer_id, value) VALUES (4, 3, '1');
INSERT INTO smartvote.question_answer (question_id, answer_id, value) VALUES (5, 1, '0');
INSERT INTO smartvote.question_answer (question_id, answer_id, value) VALUES (5, 2, '1');
INSERT INTO smartvote.question_answer (question_id, answer_id, value) VALUES (6, 1, '1');
INSERT INTO smartvote.question_answer (question_id, answer_id, value) VALUES (6, 2, '0');