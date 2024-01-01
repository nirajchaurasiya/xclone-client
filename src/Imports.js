import React, { useContext, useEffect, useState } from "react";
import Auth from "./components/auth/Auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { AuthContext } from "./useContext/AuthContext/AuthContext";
import Home from "./components/Home/Home";
import Loader from "./components/Loader/Loader";
import Layout from "./components/Layout/Layout";
import { io } from "socket.io-client";
import { NotificationContext } from "./useContext/NotificationsContext/NotificationsContext";
import { MessageContext } from "./useContext/MessageContext/MessageContext";
import Cookies from "js-cookie";
const routes = [
  { path: "/home", element: <Layout tweetFields={true} /> },
  { path: "/home/compose/tweet", element: <Layout /> },
  { path: "/p/:username", element: <Layout profile={true} /> },
  { path: "/p/:username/following", element: <Layout following={true} /> },
  {
    path: "/p/:username/with_replies",
    element: <Layout with_replies={true} />,
  },
  { path: "/p/:username/highlights", element: <Layout highlights={true} /> },
  { path: "/p/:username/media", element: <Layout media={true} /> },
  { path: "/p/:username/likes", element: <Layout likes={true} /> },
  { path: "/p/:username/followers", element: <Layout followers={true} /> },
  {
    path: "/p/:username/edit_profile",
    element: <Layout edit_profile={true} />,
  },
  { path: "/explore", element: <Layout explore={true} /> },
  { path: "/notifications", element: <Layout notifications={true} /> },
  { path: "/messages", element: <Layout messages={true} /> },
  { path: "/messages/:userId", element: <Layout showMessage={true} /> },
  { path: "/lists/:username", element: <Layout lists={true} /> },
  { path: "/bookmarks", element: <Layout bookmarks={true} /> },
  { path: "/communities", element: <Layout communities={true} /> },
  { path: "/hashtag/:hashtag", element: <Layout hashtag={true} /> },
  { path: "/:username/tweet/:tweetId", element: <Layout showTweet={true} /> },
  {
    path: "/:username/tweet/:tweetId/likes",
    element: <Layout tweetLike={true} />,
  },
  {
    path: "/:username/tweet/:tweetId/replies/:commentId",
    element: <Layout replies={true} />,
  },
  { path: "/settings/account", element: <Layout settings={true} /> },
  {
    path: "/settings/account/account_info",
    element: <Layout account_info={true} />,
  },
  {
    path: "/settings/account/account_info/username",
    element: <Layout update_username={true} />,
  },
  {
    path: "/settings/account/account_info/phone",
    element: <Layout update_phone={true} />,
  },
  {
    path: "/settings/account/account_info/name",
    element: <Layout name={true} />,
  },
  {
    path: "/settings/account/account_info/email",
    element: <Layout update_email={true} />,
  },
  {
    path: "/settings/account/account_info/protected_posts",
    element: <Layout update_protected_posts={true} />,
  },
  {
    path: "/settings/account/account_info/update_country",
    element: <Layout update_country={true} />,
  },
  {
    path: "/settings/account/account_info/update_language",
    element: <Layout update_languages={true} />,
  },
  {
    path: "/settings/account/account_info/update_gender",
    element: <Layout update_gender={true} />,
  },
  {
    path: "/settings/account/account_info/update_dob",
    element: <Layout update_dob={true} />,
  },
  { path: "/settings", element: <Layout settings={true} /> },
  {
    path: "/settings/account/change-password",
    element: <Layout changePassword={true} />,
  },
  {
    path: "/settings/account/admin-panel",
    element: <Layout adminPanel={true} />,
  },
  {
    path: "/settings/account/tweet-privacy",
    element: <Layout tweetPrivacy={true} />,
  },
  // Deactivate account
  {
    path: "/settings/account/deactivate-account",
    element: <Layout deactivateAcc={true} />,
  },
  {
    path: "/settings/account/forgot-password",
    element: <Layout forgotPass={true} />,
  },
  { path: "/*", element: <Layout pageNotFound={true} /> },
];
export {
  React,
  useContext,
  useEffect,
  useState,
  Auth,
  BrowserRouter,
  Route,
  Routes,
  Login,
  Register,
  AuthContext,
  Home,
  Loader,
  Layout,
  io,
  NotificationContext,
  MessageContext,
  Cookies,
  routes,
};
