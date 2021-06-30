import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { SyntheticEvent } from 'react';
import Wrapper from '../../components/Wrapper';
import { Permission } from '../../models/permission';
import { Redirect } from 'react-router';

const RoleEdit = (props: any) => {
    const [permissions, setPermissions] = useState([]);
    const [selected, setSelected] = useState([] as String[]);
    const [name, setName] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        (
            async () => {
                const res = await axios.get('permissions');

                setPermissions(res.data);

                const { data } = await axios.get(`roles/${props.match.params.id}`);

                setName(data.name);
                setSelected(data.permissions.map((p: Permission) => String(p.id)));

            }
        )();
    }, []);
    const check = (id: String) => {
        if (selected.some(s => s === id)) {
            setSelected(selected.filter(s => s !== id));
            return;
        }
        setSelected([...selected, id]);
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
                    <input className="form-control"
                        defaultValue={name}
                        onChange={e => setName(e.target.value)} />
                </div>

                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Permissions</label>
                    <div className="col-sm-10">
                        {permissions.map((p: Permission) => {
                            return (
                                <div className="form-check form-check-inline col-3" key={p.id}>
                                    <input className="form-check-input" type="checkbox"
                                        value={p.id}
                                        defaultChecked={selected.some(s => s === (String(p.id)))}
                                        onChange={() => check(String(p.id))}
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

export default RoleEdit;
