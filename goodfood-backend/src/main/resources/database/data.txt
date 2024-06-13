-- Arquivo data.sql Não pode ser Nullo

INSERT INTO TBL_CATEGORY (NAME) VALUES ('Cliente');
INSERT INTO TBL_CATEGORY (NAME) VALUES ('Nutricionista');

-- INSERT INTO TBL_USER (NAME, EMAIL, PASSWORD, CATEGORY_ID) VALUES ('Michael', 'michael@email.com', 'senha123', 1);
-- INSERT INTO TBL_USER (NAME, EMAIL, PASSWORD, CATEGORY_ID) VALUES ('Bruno', 'bruno@email.com', 'senha123', 1);
-- INSERT INTO TBL_USER (NAME, EMAIL, PASSWORD, CATEGORY_ID) VALUES ('Luan', 'luan@email.com', 'senha123', 1);
-- INSERT INTO TBL_USER (NAME, EMAIL, PASSWORD, DESCRIPTION, TELEPHONE, CATEGORY_ID) VALUES ('Felipe', 'felipe@email.com', 'senha123', 'Especialista em alimentação para treinos', '(15) 98800-8800',2);
-- INSERT INTO TBL_USER (NAME, EMAIL, PASSWORD, DESCRIPTION, TELEPHONE, CATEGORY_ID) VALUES ('Gabriel', 'gabriel@email.com', 'senha123', 'Trabalho na GoodFood desde 2024', '(15) 98800-8800', 2);

INSERT INTO TBL_NUTRITIONIST (NAME, EMAIL, PASSWORD, DESCRIPTION, CELLPHONE, CFM) VALUES ('Felipe', 'felipe@email.com', 'senha123', 'Especialista em alimentação para treinos', '(15) 98800-8800', '1010-5');
INSERT INTO TBL_NUTRITIONIST (NAME, EMAIL, PASSWORD, DESCRIPTION, CELLPHONE, CFM) VALUES ('Gabriel', 'gabriel@email.com', 'senha123', 'Trabalho na GoodFood desde 2024', '(15) 98800-8800', '2020-5');
