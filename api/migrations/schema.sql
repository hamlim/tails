create table if not exists users (
    id integer primary key autoincrement,
    email text not null,
    password text not null,
    salt text not null
    -- created_at datetime not null,
    -- updated_at datetime not null
);

create table if not exists session (
    id text not null primary key,
    expires_at integer not null,
    user_id text not null,
    foreign key (user_id) references users (id)
);

create table if not exists ingredients (
    id integer primary key autoincrement,
    name text not null
);

create table if not exists recipes (
    id integer primary key autoincrement,
    user_id integer not null,
    title text not null,
    description text not null,
    created_at datetime not null,
    updated_at datetime not null,
    foreign key (user_id) references users (id)
);

create table if not exists recipe_ingredients (
    recipe_id integer not null,
    ingredient_id integer not null,
    quantity text not null,
    foreign key (recipe_id) references recipes (id),
    foreign key (ingredient_id) references ingredients (id),
    primary key (recipe_id, ingredient_id)
);
