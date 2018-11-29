import React from 'react';
import {Link} from 'react-router';
import marked from 'marked';

module.exports = React.createClass({
    rawMarkup: function() {
      var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
      return { __html: rawMarkup };
    },

    render: function() {
      return (
        <div className="comment">
          <h2 className="commentAuthor">
            {this.props.author}
          </h2>
          <span dangerouslySetInnerHTML={this.rawMarkup()} />
          <Link to={'/' + this.props.id}>Edit</Link>
        </div>
      );
    }
  });