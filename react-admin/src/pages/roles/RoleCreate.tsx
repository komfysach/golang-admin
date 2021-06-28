import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { SyntheticEvent } from 'react';
import Wrapper from '../../components/Wrapper';
import { Permission } from '../../models/permission';
import { Redirect } from 'react-router';

const RoleCreate = () => {
    const [permission, setPermission] = useState([]);
    const [selected, setSelected] = useState([] as String[]);
    const [name, setName] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get('permissions');

                setPermission(data);
            }
        )();
    }, []);
    const check = (Id: String) => {
        if (selected.some(s => s === Id)) {
            setSelected(selected.filter(s => s !== Id));
            return;
        }
        setSelected([...selected, Id]);
    }

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await axios.post('roles', {
            name,
            permissions: selected
        });

        setRedirect(true);
    }
    if (redirect) {
        return <Redirect to="/roles" />
    }
    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label>Name</label>
                    <input className="form-control" onChange={e => setName(e.target.value)} />
                </div>

                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Permissions</label>
                    <div className="col-sm-10">
                        {permission.map((p: Permission) => {
                            return (
                                <div className="form-check form-check-inline col-3" key={p.Id}>
                                    <input className="form-check-input" type="checkbox"
                                        value={p.Id}
                                        onChange={() => check(String(p.Id))}
                                    />
                                    <label className="form-check-label">{p.name}</label>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Add</button>
            </form>
        </Wrapper>
    );
}

export default RoleCreate;
