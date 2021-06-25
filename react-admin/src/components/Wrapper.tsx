import React, { Component } from 'react'
import Menu from './Menu'
import Nav from './Nav'

class Wrapper extends Component {
    render() {
        return (
            <>
                <Nav />
                <div className="container-fluid">
                    <div className="row">
                        <Menu />

                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                            {this.props.children}
                        </main>
                    </div>
                </div>
            </>
        )
    }
}

export default Wrapper
