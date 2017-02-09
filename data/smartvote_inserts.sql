INSERT INTO smartvote.question  VALUES (0, 'Jolie question de sa mère !!', '["ES6", "Angular2", "SF3"]');
INSERT INTO smartvote.question VALUES (1, 'Plop generated', '["VueJS", "SF3"]');
INSERT INTO smartvote.question VALUES (2, 'Yolo Yellow !!', null);

INSERT INTO smartvote.answers VALUES (0, 'Oui');
INSERT INTO smartvote.answers VALUES (1, 'Non');
INSERT INTO smartvote.answers VALUES (2, 'Peut-être');

INSERT INTO smartvote.question_answer (question_id, answer_id, value) VALUES (0, 0, '0');
INSERT INTO smartvote.question_answer (question_id, answer_id, value) VALUES (0, 1, '0');
INSERT INTO smartvote.question_answer (question_id, answer_id, value) VALUES (0, 2, '1');
INSERT INTO smartvote.question_answer (question_id, answer_id, value) VALUES (1, 0, '0');
INSERT INTO smartvote.question_answer (question_id, answer_id, value) VALUES (1, 1, '1');
INSERT INTO smartvote.question_answer (question_id, answer_id, value) VALUES (2, 0, '1');
INSERT INTO smartvote.question_answer (question_id, answer_id, value) VALUES (2, 1, '0');
