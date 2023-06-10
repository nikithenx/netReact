
import {
    Delete,
    Edit
} from '@mui/icons-material';
import {
    Box,
    Tooltip,
    Typography
} from '@mui/material';
import { orange, red } from '@mui/material/colors';
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridRowParams,
    GridToolbar,
    GridValueFormatterParams
} from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ProjectReadOnly } from '../../app/models/projects/ProjectReadOnly';
import { Endpoints } from '../../constants/Endpoints';
import { ProjectDialog } from '../dialogs/ProjectDialog';


const ProjectList = () => {

    const [projects, setProjects] = useState<ProjectReadOnly[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [dialogProps, setDialogProps] = useState<null | ProjectReadOnly>(null);

    useEffect(() => {
        async function loadProjects() {
            await axios.get(Endpoints.Projects)
                .then(response => {
                    setProjects(response.data);
                    setLoading(false);
                })
        }
        loadProjects();
    }, [])

    const onClickDelete = React.useCallback(
        (params: ProjectReadOnly) => () => {
            setDialogProps(params);
            setOpen(true);
        },
        [],
    );

    const deleteProject = async () => {
        const response = await axios.delete(`${Endpoints.Projects}/${dialogProps?.id || 0}`);
        if (response.status === 204) {
            const newProjects = projects.filter((item) => item.id !== dialogProps?.id);
            setProjects(newProjects);
        }
    }

    const columns = React.useMemo<GridColDef<ProjectReadOnly>[]>(
        () => [
            { field: 'nr', headerName: 'Project ID', width: 150 },
            { field: 'name', headerName: 'Project Name', flex: 1 },
            {
                field: 'startDate',
                headerName: 'Start Date',
                flex: 1,
                valueFormatter: (params: GridValueFormatterParams<Date>) => {
                    if (params.value == null) {
                        return '';
                    }

                    const date = new Date(params.value);
                    return date.toLocaleDateString('en-US');
                },
            },
            {
                field: 'endDate',
                headerName: 'End Date',
                flex: 1,
                valueFormatter: (params: GridValueFormatterParams<Date>) => {
                    if (params.value == null) {
                        return '';
                    }

                    const date = new Date(params.value);
                    return date.toLocaleDateString('en-US');
                },
            },
            { field: 'sponsorName', headerName: 'Sponsor', flex: 1.5 },
            {
                field: 'actions',
                headerName: 'Action',
                type: 'actions',
                width: 80,
                getActions: (params: GridRowParams<ProjectReadOnly>) => [
                    <Tooltip title={"Edit " + params.row.name}>
                        <GridActionsCellItem
                            icon={<Edit />}
                            onClick={onClickDelete(params.row)}
                            label="Edit"
                            sx={{ color: orange[700] }}
                        />
                    </Tooltip>,
                    <Tooltip title={"Delete " + params.row.name}>
                        <GridActionsCellItem
                            icon={<Delete />}
                            onClick={onClickDelete(params.row)}
                            label="Delete"
                            sx={{ color: red[700] }}
                        />
                    </Tooltip>
                ],
            },
        ],
        [onClickDelete]
    );

    return (
        <div className="d-flex flex-column page-main-margin">
            <ProjectDialog
                title={`Delete ${dialogProps?.nr} ${dialogProps?.name}`}
                content={"Do you really want to delete this project? This action cannot be undone."}
                open={open}
                onClose={value => {
                    setOpen(false)
                    if (value) {
                        deleteProject();
                    }
                }}
            />
            <Box sx={{ height: '80vh', width: '100%' }}>
                <DataGrid
                    loading={loading}
                    rows={projects}
                    columns={columns}
                    slots={{ toolbar: GridToolbar }}
                />
            </Box>
        </div>
    );
}

export default ProjectList;