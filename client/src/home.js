import React from 'react';

function Home() {





    const images = ['0.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg']



    return (
        <div className="page_view">
            <div className="centre_text container">
                <h1>Hello</h1>

            <div className="card_grid_container">

                { images.map( (img, i) => (
                <div className="card" key={i}>
                    <img className="card-img-top" src={`/assets/images/products/${img}`} alt="product" />
                    <div className="card-body">
                        <h5 className="card-title">Title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">More...</a>
                    </div>
                </div>
                ))}



            </div>


            </div>
        </div>
    );
}

export default Home;
