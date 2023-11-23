import React from "react";
import { faker } from "@faker-js/faker";
import { useState } from "react";

class CommentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likedCount: 0,
    };
  }

  handleLikeClick = () => {
    this.setState((prevState) => ({
      likedCount: prevState.likedCount + 1,
    }));
  };

  render() {
    const { avatar, name, time, comment } = this.props;
    const { likedCount } = this.state;

    return (
      <div className="ui container comments">
        <div className="comment">
          <a href="/" className="avatar">
            <img src={avatar} alt="avatar" />
          </a>
          <div className="content">
            <a href="/" className="author">
              {name}
            </a>
            <div className="metadata">
              <span className="date">
                {`Today at ${time}`} | Liked: {likedCount}
              </span>
            </div>
            <div className="text">{comment}</div>
            <button onClick={this.handleLikeClick}>Click Me</button>
          </div>
        </div>
      </div>
    );
  }
}

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    this.commentData = this.generateFakeDataArray();
  }

  // Fungsi untuk menghasilkan array data fake
  generateFakeDataArray() {
    const fakeDataArray = [];
    for (let i = 0; i < 10; i++) {
      fakeDataArray.push({
        avatar: faker.image.avatar(),
        name: faker.person.firstName(),
        day: faker.lorem.sentence(),
        time: faker.date.recent().toLocaleTimeString(),
        comment: faker.lorem.sentence(),
      });
    }
    return fakeDataArray;
  }

  render() {
    return (
      <div className="commentContainer">
        {this.commentData.map((dataComment, index) => (
          <CommentContainer
            key={index}
            avatar={dataComment.avatar}
            name={dataComment.name}
            time={dataComment.time}
            comment={dataComment.comment}
          />
        ))}
      </div>
    );
  }
}

export default Comments;

// const App = ({ name, image, comment, time }) => {
//   return (
//     <div className="ui container comments">
//       <div className="comment">
//         <a href="/" className="avatar">
//           <img src={image} alt="avatar" />
//         </a>
//         <div className="content">
//           <a href="/" className="author">
//             {name}
//           </a>
//           <div className="metadata">
//             <span className="date">{`Today at ${time}`}</span>
//           </div>
//           <div className="text">{comment}</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
