import React from "react";
import { MarkerType, Position } from "reactflow";
interface TableColumn {
  name: string | string[];
  dataType?: string;
  constrain: "PK" | "FK" | "column" | "unique" | "check" | "indexes" | "constraints";
  sourceId?: string;
  enableSourceHandle?: boolean;
  targetId?: string;
  enableTargetHandle?: boolean;
  unique?: boolean;
  notNull?: boolean;
  default?: string | boolean;
  columns?: string[];
}

interface TableNodeData {
  entityName: string;
  attributes: TableColumn[];
}

export interface TableNode {
  id: string;
  type: string;
  data: TableNodeData;
  position: { x: number; y: number };
}

export interface TableEdge {
  id: string;
  source: string;
  target: string;
  type: string;
  animated: boolean;
  label: string;
  sourceHandle: string;
  targetHandle: string;
  markerEnd: {
    type: MarkerType;
  };
}
export const nodes: TableNode[] = [
  {
    type: "custom",
    id: "Users",
    position: { x: 0, y: 0 },
    data: {
      entityName: "Users",
      attributes: [
        {
          name: "ID", //Display
          dataType: "INT", //Display
          constrain: "PK",
          sourceId: "UsersId", // combination of source(primaryKey) table name and source(primaryKey) column name
          enableSourceHandle: true, // true if the column is a primary key
        },
        {
          name: "username",
          dataType: "VARCHAR(255)",
          constrain: "column",
          unique: true,
          notNull: true,
        },
        {
          name: "email",
          dataType: "VARCHAR(255)",
          constrain: "column",
          unique: true,
          notNull: true,
        },
        {
          name: "password",
          dataType: "VARCHAR(255)",
          constrain: "column",
          notNull: true,
        },
        {
          name: "subscription_type",
          dataType: "ENUM('free', 'basic', 'premium')",
          constrain: "column",
        },
        {
          name: "created_at",
          dataType: "DATETIME",
          constrain: "column",
          notNull: true,
          default: "CURRENT_TIMESTAMP",
        },
        {
          name: "updated_at",
          dataType: "DATETIME",
          constrain: "column",
          notNull: true,
          default: "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        },
        {
          name: ["username"],
          dataType: "unique",
          constrain: "constraints",
        },
        {
          name: ["email"],
          dataType: "unique",
          constrain: "constraints",
        },
        {
          name: "subscription_type IN ('free', 'basic', 'premium')",
          dataType: "check",
          constrain: "constraints",
        },
        {
          name: "idx_users_username",
          constrain: "indexes",
          columns: ["username"],
        },
        {
          name: "idx_users_email",
          constrain: "indexes",
          columns: ["email"],
        },
      ],
    },
  },
  {
    type: "custom",
    id: "Movies",
    position: { x: 600, y: 0 },
    data: {
      entityName: "Movies",
      attributes: [
        {
          name: "id",
          dataType: "INT",
          constrain: "PK",
          sourceId: "MoviesId", // combination of source(primaryKey) table name and source(primaryKey) column name
          enableSourceHandle: true, // true if the column is a primary key
        },
        {
          name: "title",
          dataType: "VARCHAR(255)",
          constrain: "column",
          notNull: true,
        },
        {
          name: "description",
          dataType: "TEXT",
          constrain: "column",
        },
        {
          name: "release_year",
          dataType: "INT",
          constrain: "column",
        },
        {
          name: "duration",
          dataType: "INT",
          constrain: "column",
        },
        {
          name: "director",
          dataType: "VARCHAR(255)",
          constrain: "column",
        },
        {
          name: "cast",
          dataType: "TEXT",
          constrain: "column",
        },
        {
          name: "poster_url",
          dataType: "VARCHAR(255)",
          constrain: "column",
        },
        {
          name: "genre",
          dataType: "VARCHAR(255)",
          constrain: "column",
        },
        {
          name: "rating",
          dataType: "DECIMAL(2,1)",
          constrain: "column",
        },
        {
          name: "is_active",
          dataType: "BOOLEAN",
          constrain: "column",
          default: true,
        },
        {
          name: "created_at",
          dataType: "DATETIME",
          constrain: "column",
          notNull: true,
          default: "CURRENT_TIMESTAMP",
        },
        {
          name: "updated_at",
          dataType: "DATETIME",
          constrain: "column",
          notNull: true,
          default: "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        },
        {
          name: "release_year > 0",
          dataType: "check",
          constrain: "constraints",
        },
        {
          name: "duration > 0",
          dataType: "check",
          constrain: "constraints",
        },
        {
          name: "rating BETWEEN 0 AND 5",
          dataType: "check",
          constrain: "constraints",
        },
        {
          name: "idx_movies_title",
          constrain: "indexes",
          columns: ["title"],
        },
        {
          name: "idx_movies_genre",
          constrain: "indexes",
          columns: ["genre"],
        },
      ],
    },
  },
  {
    type: "custom",
    id: "Genres",
    position: { x: 1100, y: 0 },
    data: {
      entityName: "Genres",
      attributes: [
        {
          name: "id",
          dataType: "INT",
          constrain: "PK",
          sourceId: "GenresId", // combination of source(primaryKey) table name and source(primaryKey) column name
          enableSourceHandle: true, // true if the column is a primary key
        },
        {
          name: "name",
          constrain: "column",
          dataType: "VARCHAR(255)",
          notNull: true,
        },
        {
          name: "description",
          dataType: "TEXT",
          constrain: "column",
        },
        {
          name: "created_at",
          dataType: "DATETIME",
          constrain: "column",
          notNull: true,
          default: "CURRENT_TIMESTAMP",
        },
        {
          name: "updated_at",
          dataType: "DATETIME",
          constrain: "column",
          notNull: true,
          default: "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        },
        {
          name: "idx_genres_name",
          constrain: "indexes",
          columns: ["name"],
        },
      ],
    },
  },
  {
    type: "custom",
    id: "MovieGenres",
    position: { x: 1500, y: 0 },
    data: {
      entityName: "MovieGenres",
      attributes: [
        {
          name: "movie_id",
          dataType: "INT",
          constrain: "PK",
          sourceId: "MovieId", // combination of source(primaryKey) table name and source(primaryKey) column name
          enableSourceHandle: true, // true if the column is a primary key
          targetId: "MovieGenres-MoviesId", // combination of target(foreignKey) table name and target(foreignKey) column name
          enableTargetHandle: true, // true if the column is a foreign key
        },
        {
          name: "genre_id",
          dataType: "INT",
          constrain: "PK",
          sourceId: "GenreId", // combination of source(primaryKey) table name and source(primaryKey) column name
          enableSourceHandle: true, // true if the column is a primary key
          targetId: "MovieGenres-GenresId", // combination of target(foreignKey) table name and target(foreignKey) column name
          enableTargetHandle: true, // true if the column is a foreign key
        },
      ],
    },
  },
  {
    type: "custom",
    id: "Episodes",
    position: { x: 0, y: 800 },
    data: {
      entityName: "Episodes",
      attributes: [
        {
          name: "id",
          dataType: "INT",
          constrain: "PK",
          sourceId: "EpisodesId", // combination of source(primaryKey) table name and source(primaryKey) column name
          enableSourceHandle: true, // true if the column is a primary key
        },
        {
          name: "movie_id",
          dataType: "INT",
          constrain: "FK",
          targetId: "Episodes-MoviesId", // combination of target(foreignKey) table name and target(foreignKey) column name
          enableTargetHandle: true, // true if the column is a foreign key
        },
        {
          name: "season",
          dataType: "INT",
          constrain: "column",
          notNull: true,
        },
        {
          name: "episode_number",
          dataType: "INT",
          constrain: "column",
          notNull: true,
        },
        {
          name: "title",
          dataType: "VARCHAR(255)",
          constrain: "column",
          notNull: true,
        },
        {
          name: "duration",
          dataType: "INT",
          constrain: "column",
        },
        {
          name: "is_active",
          dataType: "BOOLEAN",
          constrain: "column",
          default: true,
        },
        {
          name: "created_at",
          dataType: "DATETIME",
          constrain: "column",
          notNull: true,
          default: "CURRENT_TIMESTAMP",
        },
        {
          name: "updated_at",
          dataType: "DATETIME",
          constrain: "column",
          notNull: true,
          default: "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        },
        {
          name: "season > 0",
          dataType: "check",
          constrain: "constraints",
        },
        {
          name: "episode_number > 0",
          dataType: "check",
          constrain: "constraints",
        },
        {
          name: "idx_episodes_season_episode_number",
          constrain: "indexes",
          columns: ["season", "episode_number"],
        },
      ],
    },
  },
  {
    type: "custom",
    id: "WatchLists",
    position: { x: 1100, y: 800 },
    data: {
      entityName: "WatchLists",
      attributes: [
        {
          name: "id",
          dataType: "INT",
          constrain: "PK",
          sourceId: "WatchListsId", // combination of source(primaryKey) table name and source(primaryKey) column name
          enableSourceHandle: true, // true if the column is a primary key
        },
        {
          name: "user_id",
          dataType: "INT",
          constrain: "FK",
          targetId: "WatchLists-UsersId", // combination of target(foreignKey) table name and target(foreignKey) column name
          enableTargetHandle: true, // true if the column is a foreign key
        },
        {
          name: "movie_id",
          dataType: "INT",
          constrain: "FK",
          targetId: "WatchLists-MoviesId", // combination of target(foreignKey) table name and target(foreignKey) column name
          enableTargetHandle: true, // true if the column is a foreign key
        },
        {
          name: "added_at",
          dataType: "DATETIME",
          constrain: "column",
          notNull: true,
          default: "CURRENT_TIMESTAMP",
        },
        {
          name: "idx_watchlists_user_id_movie_id",
          constrain: "indexes",
          columns: ["user_id", "movie_id"],
        },
      ],
    },
  },
  {
    type: "custom",
    id: "Reviews",
    position: { x: 1500, y: 300 },
    data: {
      entityName: "Reviews",
      attributes: [
        {
          name: "id",
          dataType: "INT",
          constrain: "PK",
          sourceId: "ReviewsId", // combination of source(primaryKey) table name and source(primaryKey) column name
          enableSourceHandle: true, // true if the column is a primary key
        },
        {
          name: "user_id",
          dataType: "INT",
          constrain: "FK",
          targetId: "Reviews-UsersId", // combination of target(foreignKey) table name and target(foreignKey) column name
          enableTargetHandle: true, // true if the column is a foreign key
        },
        {
          name: "movie_id",
          dataType: "INT",
          constrain: "FK",
          targetId: "Reviews-MoviesId", // combination of target(foreignKey) table name and target(foreignKey) column name
          enableTargetHandle: true, // true if the column is a foreign key
        },
        {
          name: "rating",
          dataType: "INT",
          constrain: "column",
          notNull: true,
        },
        {
          name: "review_text",
          dataType: "TEXT",
          constrain: "column",
        },
        {
          name: "created_at",
          dataType: "DATETIME",
          constrain: "column",
          notNull: true,
          default: "CURRENT_TIMESTAMP",
        },
        {
          name: "updated_at",
          dataType: "DATETIME",
          constrain: "column",
          notNull: true,
          default: "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        },
        {
          name: "rating BETWEEN 1 AND 10",
          dataType: "check",
          constrain: "constraints",
        },
        {
          name: "idx_reviews_user_id_movie_id",
          constrain: "indexes",
          columns: ["user_id", "movie_id"],
        },
      ],
    },
  },
  {
    type: "custom",
    id: "Subscriptions",
    position: { x: 600, y: 1200 },
    data: {
      entityName: "Subscriptions",
      attributes: [
        {
          name: "id",
          dataType: "INT",
          constrain: "PK",
          sourceId: "SubscriptionsId", // combination of source(primaryKey) table name and source(primaryKey) column name
          enableSourceHandle: true, // true if the column is a primary key
        },
        {
          name: "name",
          dataType: "VARCHAR(255)",
          constrain: "column",
          notNull: true,
        },
        {
          name: "price",
          dataType: "DECIMAL(10,2)",
          constrain: "column",
          notNull: true,
        },
        {
          name: "features",
          dataType: "TEXT",
          constrain: "column",
        },
        {
          name: "created_at",
          dataType: "DATETIME",
          constrain: "column",
          notNull: true,
          default: "CURRENT_TIMESTAMP",
        },
        {
          name: "updated_at",
          dataType: "DATETIME",
          constrain: "column",
          notNull: true,
          default: "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP",
        },
        {
          name: "price > 0",
          dataType: "check",
          constrain: "constraints",
        },
        {
          name: "idx_subscriptions_name",
          constrain: "indexes",
          columns: ["name"],
        },
      ],
    },
  },
  {
    type: "custom",
    id: "UserSubscriptions",
    position: { x: 1100, y: 1200 },
    data: {
      entityName: "UserSubscriptions",
      attributes: [
        {
          name: "user_id",
          dataType: "INT",
          constrain: "PK",
          sourceId: "UserId", // combination of source(primaryKey) table name and source(primaryKey) column name
          enableSourceHandle: true, // true if the column is a primary key
          targetId: "UserSubscriptions-UsersId", // combination of target(foreignKey) table name and target(foreignKey) column name
          enableTargetHandle: true, // true if the column is a foreign key
        },
        {
          name: "subscription_id",
          dataType: "INT",
          constrain: "PK",
          sourceId: "SubscriptionId", // combination of source(primaryKey) table name and source(primaryKey) column name
          enableSourceHandle: true, // true if the column is a primary key
          targetId: "UserSubscriptions-SubscriptionsId", // combination of target(foreignKey) table name and target(foreignKey) column name
          enableTargetHandle: true, // true if the column is a foreign key
        },
      ],
    },
  },
];

export const edges: TableEdge[] = [
  {
    id: "Edge-Users-WatchLists",
    source: "Users",
    target: "WatchLists",
    animated: true,
    label: "to the",
    type: "bezier", //step, smoothstep, straight, bezier
    sourceHandle: "UsersId",
    targetHandle: "WatchLists-UsersId",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "Edge-Users-Reviews",
    source: "Users",
    target: "Reviews",
    animated: true,
    label: "to the",
    type: "bezier", //step, smoothstep, straight, bezier
    sourceHandle: "UsersId",
    targetHandle: "Reviews-UsersId",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "Edge-Users-UserSubscriptions",
    source: "Users",
    target: "UserSubscriptions",
    animated: true,
    label: "to the",
    type: "bezier", //step, smoothstep, straight, bezier
    sourceHandle: "UsersId",
    targetHandle: "UserSubscriptions-UsersId",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },

  {
    id: "Edge-Movies-MovieGenres",
    source: "Movies",
    target: "MovieGenres",
    animated: true,
    label: "to the",
    type: "bezier", //step, smoothstep, straight, bezier
    sourceHandle: "MoviesId",
    targetHandle: "MovieGenres-MoviesId",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "Edge-Movies-Episodes",
    source: "Movies",
    target: "Episodes",
    animated: true,
    label: "to the",
    type: "bezier", //step, smoothstep, straight, bezier
    sourceHandle: "MoviesId",
    targetHandle: "Episodes-MoviesId",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "Edge-Movies-WatchLists",
    source: "Movies",
    target: "WatchLists",
    animated: true,
    label: "to the",
    type: "bezier", //step, smoothstep, straight, bezier
    sourceHandle: "MoviesId",
    targetHandle: "WatchLists-MoviesId",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
  {
    id: "Edge-Movies-Reviews",
    source: "Movies",
    target: "Reviews",
    animated: true,
    label: "to the",
    type: "bezier", //step, smoothstep, straight, bezier
    sourceHandle: "MoviesId",
    targetHandle: "Reviews-MoviesId",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },

  {
    id: "Edge-Genres-MovieGenres",
    source: "Genres",
    target: "MovieGenres",
    animated: true,
    label: "to the",
    type: "bezier", //step, smoothstep, straight, bezier
    sourceHandle: "GenresId",
    targetHandle: "MovieGenres-GenresId",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },

  {
    id: "Edge-MovieGenres-UserSubscriptions",
    source: "MovieGenres",
    target: "UserSubscriptions",
    animated: true,
    label: "to the",
    type: "bezier", //step, smoothstep, straight, bezier
    sourceHandle: "MovieId",
    targetHandle: "UserSubscriptions-UsersId",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },

  {
    id: "Edge-Subscriptions-UserSubscriptions",
    source: "Subscriptions",
    target: "UserSubscriptions",
    animated: true,
    label: "to the",
    type: "bezier", //step, smoothstep, straight, bezier
    sourceHandle: "SubscriptionsId",
    targetHandle: "UserSubscriptions-SubscriptionsId",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];
