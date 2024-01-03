import React from "react";
import "./rightbar.css";
import TrendingComponent from "../TrendingComponent/TrendingComponent";
import SearchInput from "../SearchInput/SearchInput";
import PremiumBox from "../PremiumBox/PremiumBox";
import SuggestionFollowers from "../SuggestionFriends/SuggestionFollowers";
import SuggestionsFriendFollowing from "../SuggestionFriends/SuggestionsFriendFollowing";
export default function Rightbar() {
  return (
    <div className="rightbar_container">
      <div className="rightbar_content">
        {/* <SearchInput /> */}
        <PremiumBox />
        <TrendingComponent />
        <SuggestionFollowers />
        <SuggestionsFriendFollowing />
        <PremiumBox feedback />
        {/* <PremiumBox social /> */}
      </div>
    </div>
  );
}
