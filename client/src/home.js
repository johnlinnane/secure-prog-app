import React from 'react';

function Home() {





    const images = ['0.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg']
    const names = ['occidentalizing','paracelsus','semifinal','thamyris','unimpatient','tenebrist','nonvalued','vulcanism','predeplete','aalii']



    return (
        <div className="page_view">
            <div className="centre_text container">
                <h1>Hello</h1>

            <div className="card_grid_container">

                { images.map( (img, i) => (
                <div className="card" key={i}>
                    <img className="card-img-top" src={`/assets/images/products/${img}`} alt="product" />
                    <div className="card-body">
                        <h5 className="card-title">{names[i]}</h5>
                        <p className="card-text">Some information about the product.</p>
                        <a href="#" className="btn btn-primary">More</a>
                    </div>
                </div>
                ))}



            </div>


            </div>
        </div>
    );
}

export default Home;
