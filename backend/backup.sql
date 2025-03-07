--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: carttable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carttable (
    cart_id uuid NOT NULL,
    quantity integer NOT NULL,
    product_id uuid,
    user_id uuid
);


ALTER TABLE public.carttable OWNER TO postgres;

--
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    category_id uuid NOT NULL,
    category_name character varying(255)
);


ALTER TABLE public.category OWNER TO postgres;

--
-- Name: feedbacktable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.feedbacktable (
    feedback_id uuid DEFAULT gen_random_uuid() NOT NULL,
    feedback_text text,
    rating integer,
    user_id uuid,
    feedback_date timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT feedbacktable_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.feedbacktable OWNER TO postgres;

--
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    product_id uuid NOT NULL,
    product_name character varying(255) NOT NULL,
    features jsonb,
    category_id uuid NOT NULL,
    product_type_id uuid NOT NULL,
    price numeric(10,2),
    description text,
    date timestamp without time zone DEFAULT now()
);


ALTER TABLE public.product OWNER TO postgres;

--
-- Name: producttype; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.producttype (
    product_type_id uuid NOT NULL,
    product_type_name character varying
);


ALTER TABLE public.producttype OWNER TO postgres;

--
-- Name: reviewtable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviewtable (
    review_id uuid DEFAULT gen_random_uuid() NOT NULL,
    review_text text,
    review_date timestamp with time zone,
    rating integer NOT NULL,
    user_id uuid,
    product_id uuid,
    CONSTRAINT reviewtable_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.reviewtable OWNER TO postgres;

--
-- Name: usertable; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usertable (
    user_id uuid DEFAULT gen_random_uuid() NOT NULL,
    firstname character varying(100) NOT NULL,
    lastname character varying(100) NOT NULL,
    phone character varying(15) NOT NULL,
    email_id character varying(100) NOT NULL
);


ALTER TABLE public.usertable OWNER TO postgres;

--
-- Data for Name: carttable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carttable (cart_id, quantity, product_id, user_id) FROM stdin;
\.


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.category (category_id, category_name) FROM stdin;
525e7dfa-3bea-4903-93fe-f558091bf35d	formal
7d1c3779-85f5-4809-b3f7-4b82b10c8cfd	Gym
ce6ab8c4-fcd1-41a2-a602-f081762067a6	Casual
\.


--
-- Data for Name: feedbacktable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.feedbacktable (feedback_id, feedback_text, rating, user_id, feedback_date) FROM stdin;
74902994-0bb7-427b-b6ce-ea23c6f1552a	Great product! Highly recommended.	5	3a420407-c188-4482-a02c-78364679388d	2025-01-29 14:53:10.317964
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product (product_id, product_name, features, category_id, product_type_id, price, description, date) FROM stdin;
891dd2e1-b9bb-48e1-b72e-8fd1c5fb30ba	Test Product	[{"_key": "3203502a343e", "size": "Large", "color": "red", "image": null, "isDefault": false}]	7d1c3779-85f5-4809-b3f7-4b82b10c8cfd	72f4d67c-4342-4271-92ac-14e4da9dca92	\N	\N	2025-02-03 06:56:47.201
903becb4-6892-4f9d-9ca8-a5f7e6c78aca	TestProduct 3	[{"_key": "477df944db87", "size": "small", "color": "blue", "image": null, "isDefault": false}]	525e7dfa-3bea-4903-93fe-f558091bf35d	08344d06-5ced-4d1c-8403-c5727eaf3c27	\N	\N	2025-02-03 07:06:01.698
a35282cf-9583-4004-80cb-415a5449b5b2	Short pant	[{"_key": "c37c7726f695", "size": "Large", "color": "blue", "image": "https://cdn.sanity.io/images/99i06wdo/dummydata/02c23ad3b2b1420cab0ab47605ad61ff7bd234b4-295x298.png", "isDefault": true}]	ce6ab8c4-fcd1-41a2-a602-f081762067a6	72f4d67c-4342-4271-92ac-14e4da9dca92	300.00	this is short jeans	2025-01-31 10:15:18.131967
00976b36-1f71-4ff1-81e8-1e4a10c2c6aa	Round neck Tshirt	[{"_key": "1d1c7087858c", "size": "Small", "color": "blue", "image": "https://cdn.sanity.io/images/99i06wdo/dummydata/e3869e5f3ba556a17b4e23023e1fb8b1dfe3ff41-1024x1024.jpg", "isDefault": false}, {"_key": "3d5978f10e07", "size": "small", "color": "red", "image": "https://cdn.sanity.io/images/99i06wdo/dummydata/6564de07dd01edfbc2b1bdfbdd7001b2e24e52b7-1024x1024.jpg", "isDefault": true}, {"_key": "54328ffd1fe8", "size": "medium", "color": "green", "image": "https://cdn.sanity.io/images/99i06wdo/dummydata/90fe4fd6a1cf0320b220dc8f79c3ffdcc3f83588-1024x1024.jpg", "isDefault": false}]	ce6ab8c4-fcd1-41a2-a602-f081762067a6	b2d203e0-b39e-455c-90b6-24e07273db0e	20.00	This is round colllar tshirt made from cotton	2025-01-31 09:51:31.928595
5e3dac5c-2ecc-441b-8330-a995a4f9ad7c	Cotton Tshirt	[{"_key": "629205dcce8c", "size": "Medium ", "color": "green", "image": "https://cdn.sanity.io/images/99i06wdo/dummydata/5cc4eb9c6997b3d09c589b9dbb9b22cc841cf7c1-444x530.png", "isDefault": true}, {"_key": "0a29845481e8", "size": "Medium", "color": "black", "image": "https://cdn.sanity.io/images/99i06wdo/dummydata/ec84cbdf3e543e928313156fce7f1b28770a30b9-295x298.png", "isDefault": false}]	ce6ab8c4-fcd1-41a2-a602-f081762067a6	b2d203e0-b39e-455c-90b6-24e07273db0e	300.00	this is a cotton tshirt	2025-01-31 10:21:05.635313
68d4097a-4cff-4522-b95e-54294bcf8ade	Jeans 	[{"_key": "57f777a99ac9", "size": "medium", "color": "blue", "image": "https://cdn.sanity.io/images/99i06wdo/dummydata/232ecf97b44f48fe984ba9e38602f5927b2942cb-268x298.png", "isDefault": true}, {"_key": "7af8f7c4810a", "size": "large", "color": "black", "image": "https://cdn.sanity.io/images/99i06wdo/dummydata/ff9be2ecec5d13644e137234e3fb46db53c54b95-252x298.png", "isDefault": false}]	ce6ab8c4-fcd1-41a2-a602-f081762067a6	72f4d67c-4342-4271-92ac-14e4da9dca92	700.00	Its jeans for you and everyone	2025-01-31 09:51:31.925641
e619122a-8d1d-44d2-8783-cf3c40c52de1	Collar Shirt	[{"_key": "7da727007a60", "size": "medium", "color": "red", "image": "https://cdn.sanity.io/images/99i06wdo/dummydata/77c8deba416ca2c88dbd92fd43401ec63d894750-737x908.webp", "isDefault": true}]	7d1c3779-85f5-4809-b3f7-4b82b10c8cfd	08344d06-5ced-4d1c-8403-c5727eaf3c27	549.00	Red shirt	2025-01-31 09:51:31.90986
\.


--
-- Data for Name: producttype; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.producttype (product_type_id, product_type_name) FROM stdin;
08344d06-5ced-4d1c-8403-c5727eaf3c27	Shirt
72f4d67c-4342-4271-92ac-14e4da9dca92	Pant
b2d203e0-b39e-455c-90b6-24e07273db0e	Tshirt
\.


--
-- Data for Name: reviewtable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviewtable (review_id, review_text, review_date, rating, user_id, product_id) FROM stdin;
bdf04526-59de-46a2-8df7-6a00ed69bcd8	This product is amazing!	2025-01-31 16:06:49.264185+05:30	5	3a420407-c188-4482-a02c-78364679388d	00976b36-1f71-4ff1-81e8-1e4a10c2c6aa
2e699492-b9ff-4dd9-9104-ead5adea025c	This product is bad, the quality is cheap	2025-01-31 16:10:46.273731+05:30	2	9a87cc92-745a-4202-8e96-bef864db57d3	00976b36-1f71-4ff1-81e8-1e4a10c2c6aa
\.


--
-- Data for Name: usertable; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usertable (user_id, firstname, lastname, phone, email_id) FROM stdin;
3a420407-c188-4482-a02c-78364679388d	John	Doe	1234567890	john.doe@example.com
9a87cc92-745a-4202-8e96-bef864db57d3	Sony	Moe	0987654321	Sony.Moe@example.com
\.


--
-- Name: category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (category_id);


--
-- Name: carttable carttable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carttable
    ADD CONSTRAINT carttable_pkey PRIMARY KEY (cart_id);


--
-- Name: feedbacktable feedbacktable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedbacktable
    ADD CONSTRAINT feedbacktable_pkey PRIMARY KEY (feedback_id);


--
-- Name: producttype productType_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.producttype
    ADD CONSTRAINT "productType_pkey" PRIMARY KEY (product_type_id);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (product_id);


--
-- Name: reviewtable reviewtable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviewtable
    ADD CONSTRAINT reviewtable_pkey PRIMARY KEY (review_id);


--
-- Name: usertable usertable_email_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usertable
    ADD CONSTRAINT usertable_email_id_key UNIQUE (email_id);


--
-- Name: usertable usertable_phone_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usertable
    ADD CONSTRAINT usertable_phone_key UNIQUE (phone);


--
-- Name: usertable usertable_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usertable
    ADD CONSTRAINT usertable_pkey PRIMARY KEY (user_id);


--
-- Name: idx_email_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_email_id ON public.usertable USING btree (email_id);


--
-- Name: idx_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_id ON public.reviewtable USING btree (product_id);


--
-- Name: idx_price; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_price ON public.product USING btree (price);


--
-- Name: idx_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_user_id ON public.reviewtable USING btree (user_id);


--
-- Name: carttable carttable_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carttable
    ADD CONSTRAINT carttable_id_fkey FOREIGN KEY (product_id) REFERENCES public.product(product_id) ON DELETE CASCADE;


--
-- Name: carttable carttable_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carttable
    ADD CONSTRAINT carttable_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.usertable(user_id) ON DELETE CASCADE;


--
-- Name: feedbacktable fk_feedback_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.feedbacktable
    ADD CONSTRAINT fk_feedback_user FOREIGN KEY (user_id) REFERENCES public.usertable(user_id) ON DELETE CASCADE;


--
-- Name: reviewtable fk_product; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviewtable
    ADD CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES public.product(product_id) ON DELETE CASCADE;


--
-- Name: reviewtable fk_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviewtable
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.usertable(user_id) ON DELETE CASCADE;


--
-- Name: product product_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.category(category_id);


--
-- Name: product product_product_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_product_type_id_fkey FOREIGN KEY (product_type_id) REFERENCES public.producttype(product_type_id);


--
-- PostgreSQL database dump complete
--

