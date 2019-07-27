import React from 'react'
import Layout from '../components/Layout'

class NotFoundPage extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <h1>Page Not Found</h1>
        <p>
          I haven’t written this post yet. It's important subject so if you want
          to join - you're welcome. Will you help me write it?
        </p>
        <p>
          So in the mean time i've added this you tube link that explain one of
          the most beautiful math equation:
        </p>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/sKtloBAuP74"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullscreen
        />
      </Layout>
    )
  }
}

export default NotFoundPage
