import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getJokeList } from "./store/actions";
import { Helmet } from "react-helmet";

import "./index.scss";
import avtor from "./../../public/img/avtor.jpg";

const Home = (props) => {
  useEffect(() => {
    const { getJokeList, jokeList } = props;
    if (!jokeList.length) {
      getJokeList();
    }
  }, []);
  const [num, setNum] = useState(0);
  return (
    <React.Fragment>
      <Helmet>
        <meta
          name="description"
          content="bilibiil是国内知名的视频弹幕网站，这里有及时的动漫新番，活跃的ACG氛围，有创意的Up主。大家可以在这里找到许多欢乐。"
        />
        <meta
          name="keywords"
          content="Bilibili,哔哩哔哩,哔哩哔哩动画,哔哩哔哩弹幕网,弹幕视频,B站,弹幕,字幕,AMV,MAD,MTV,ANIME,动漫,动漫音乐,游戏,游戏解说,二次元,游戏视频,ACG,galgame,动画,番组,新番,初音,洛天依,vocaloid,日本动漫,国产动漫,手机游戏,网络游戏,电子竞技,ACG燃曲,ACG神曲,追新番,新番动漫,新番吐槽,巡音,镜音双子,千本樱,初音MIKU,舞蹈MMD,MIKUMIKUDANCE,洛天依原创曲,洛天依翻唱曲,洛天依投食歌,洛天依MMD,vocaloid家族,OST,BGM,动漫歌曲,日本动漫音乐,宫崎骏动漫音乐,动漫音乐推荐,燃系mad,治愈系mad,MAD MOVIE,MAD高燃"
        />
        <title>My Titlda</title>
      </Helmet>
      <div
        onClick={() => {
          console.log("qqqq2", props);
          const t = num;
          setNum(t + 1);
        }}
      >
        ssadasdad{num}
        <br />
        <img src={avtor} alt="aaaac" title={avtor} />
        <img
          src={
            "https://fms.res.meizu.com/dms/2021/09/29/59720caa-fd2d-41f2-8e1c-629dde24b1b8.jpg"
          }
          alt="aaaac"
        />
        {props.jokeList.map((item, index) => (
          <span key={index}>{item.text}</span>
        ))}
      </div>
    </React.Fragment>
  );
};

Home.loadData = (store) => {
  // 传递一个 true 表示是服务器端发起的请求，而非客户端发起
  return store.dispatch(getJokeList(true));
};

const mapStateToProps = (state) => ({
  jokeList: state.homeReducer.jokeList,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getJokeList: () => dispatch(getJokeList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
