import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminMenu = () => {
    return (
        <div className="text-center">
            <div className="list-group shadow-sm">
                <h4 className="list-group-item list-group-item-action active bg-primary border-0">
                    <i className="bi bi-gear-fill me-2"></i> Admin Panel
                </h4>
                <NavLink
                    to="/dashboard/admin/create-category"
                    className="list-group-item list-group-item-action d-flex align-items-center"
                >
                    <i className="bi bi-folder-plus me-2 text-warning"></i> Create Category
                </NavLink>
                <NavLink
                    to="/dashboard/admin/create-product"
                    className="list-group-item list-group-item-action d-flex align-items-center"
                >
                    <i className="bi bi-box-seam me-2 text-success"></i> Create Product
                </NavLink>
                <NavLink
                    to="/dashboard/admin/users"
                    className="list-group-item list-group-item-action d-flex align-items-center"
                >
                    <i className="bi bi-people-fill me-2 text-info"></i> Users
                </NavLink>
            </div>
        </div>
    );
};

export default AdminMenu;
