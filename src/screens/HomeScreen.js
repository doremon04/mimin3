import React from "react";
import { FlatList } from "react-native";
import { Subscribe } from "unstated";
import Spinner from "react-native-loading-spinner-overlay";
import WordCard from "../components/WordCard";
import Modal from "../components/Modal";
import WordStateContainer from "../state-containers/WordStateContainer";
export default class HomeScreen extends React.Component {
  render() {
    return (
      <Subscribe to={[WordStateContainer]}>
        {container => {
          if (container.state.favoriteDataLoaded) {
            return (
              <React.Fragment>
                <FlatList
                  style={{ backgroundColor: "#e57373" }}
                  data={container.state.data}
                  renderItem={({ item, index }) => (
                    <WordCard cardData={item} index={index} />
                  )}
                  keyExtractor={(_, index) => index.toString()}
                  overScrollMode="always"
                />
                <Modal />
              </React.Fragment>
            );
          } else {
            container.getFavoriteData();
            return <Spinner />;
          }
        }}
      </Subscribe>
    );
  }
}
