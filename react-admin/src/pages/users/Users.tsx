import axios from 'axios'
import React, { useEffect } from 'react'
import Wrapper from '../../components/Wrapper'

const Users = () => {
    // const [users, setUsers] = useState([]);

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get('users');
                console.log(data)
            }
        )()
    }, []);

    return (
        <Wrapper>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Header</th>
                            <th scope="col">Header</th>
                            <th scope="col">Header</th>
                            <th scope="col">Header</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1,001</td>
                            <td>random</td>
                            <td>data</td>
                            <td>placeholder</td>
                            <td>text</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Wrapper>

    )
}


export default Users
