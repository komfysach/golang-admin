import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Wrapper from '../../components/Wrapper';
import { Role } from '../../models/role';
import { Link } from 'react-router-dom';

const Roles = () => {
    const [roles, setRoles] = useState([]);
    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get('roles');
                setRoles(data);
            }
        )()
    }, [])

    const del = async (id: number) => {
        if (window.confirm('Are you sure you want to delete this role?')) {
            await axios.delete(`roles/${id}`);
            setRoles(roles.filter((r: Role) => r.Id !== id))
        }
    }
    return (
        <Wrapper>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role: Role) => {
                            return (
                                <tr key={role.Id}>
                                    <td>{role.Id}</td>
                                    <td>{role.name}</td>
                                    <td>
                                        <div className="btn-group mr-2">
                                            <Link to={`/roles/${role.Id}/edit`} className="btn btn-sm btn-outline-secondary">Edit</Link>
                                            <a href="#" className="btn btn-sm btn-outline-secondary"
                                                onClick={() => del(role.Id)}>Delete</a>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </Wrapper>
    );
}

export default Roles;
