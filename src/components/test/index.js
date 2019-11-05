import React, { Component } from "react"
import Carousel from "@brainhubeu/react-carousel"
import "@brainhubeu/react-carousel/lib/style.css"
import styles from "./style.module.scss"

import img from "../../static/img/samuri.jpeg"
import img2 from "../../static/img/img_0910.jpeg"
import img3 from "../../static/img/img_1143.jpeg"

class Index extends React.Component {
  constructor() {
    super()
    this.state = { value: 1 }
    this.onChange = this.onChange.bind(this)
  }

  onChange(value) {
    this.setState({ value })
  }

  render() {
    return (
      <div className={styles.carousel}>
        <Carousel
          clickToChange
          slidesPerPage={3}
          infinite
          animationSpeed={1000}
          centered
          keepDirectionWhenDragging
          slides={[
            <img className={styles.carousel_image} src={img} />,
            <img className={styles.carousel_image} src={img2} />,
            <img className={styles.carousel_image} src={img3} />,
          ]}
        />
      </div>
    )
  }
}

export default Index
