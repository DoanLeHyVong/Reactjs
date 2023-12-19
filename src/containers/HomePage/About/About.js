import React, { Component } from 'react';
import './About.scss';

export default class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className=" container">
          <div className="section-about-header">
            <h2>Truyền thông nói về BookingCare</h2>
          </div>
          <div className="section-about-content">
            <div className="content-left">
              <iframe
                width="100%"
                height="400px"
                src="https://www.youtube.com/embed/FyDQljKtWnI"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="content-right">
              <p>
                Người bệnh dự định thăm khám tại khoa Tiêu hóa Bệnh viện Chợ Rẫy
                có thể tham khảo hướng dẫn đi khám, kinh nghiệm và một số lưu ý
                trong bài viết dưới đây.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
