
import {
    Delete,
    Edit,
    ErrorOutline
} from '@mui/icons-material';
import {
    Box,
    Chip,
    Color,
    Divider,
    LinearProgress,
    Paper,
    Stack,
    TextField,
    Tooltip,
    Typography,
    darken,
    lighten
} from '@mui/material';
import { green, orange, red } from '@mui/material/colors';
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridColumnHeaderParams,
    GridRenderCellParams,
    GridRowParams,
    GridToolbar,
    GridToolbarContainer,
    GridToolbarExport,
    GridToolbarFilterButton,
    GridToolbarQuickFilter,
    GridValueFormatterParams
} from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ProjectReadOnly } from '../../app/models/projects/ProjectReadOnly';
import { Endpoints } from '../../constants/Endpoints';
import { ProjectDialog } from '../dialogs/ProjectDialog';

function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarFilterButton />
        <GridToolbarExport />
        <Box sx={{ flexGrow: 1 }} />
        <GridToolbarQuickFilter />
      </GridToolbarContainer>
    );
}


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

    const remainingDays = (endDate : Date) : number => 
        Math.ceil(new Date(endDate).valueOf() - new Date().valueOf()) / (1000 * 3600 * 24);

    const getBackgroundColor = (value: number) : string => 
        value <= 7 ? red[700] : value > 7 && value <= 30 ? orange[700] : green[700];
        
        
    const columns = React.useMemo<GridColDef<ProjectReadOnly>[]>(
        () => [
            { 
                field: 'nr', 
                headerName: 'ID',
                width: 150,  
                renderHeader: () => (
                    <h4>Project ID</h4>                  
                ),
            },
            {
                field: 'name', 
                headerName: 'Name',
                flex: 1, 
                renderHeader: () => (
                    <h4>Project Name</h4>
                ),
            },
            {
                field: 'endDate',      
                headerName: 'End Date',          
                flex: 1,
                renderHeader: () => (
                    <h4>End Date</h4>
                ),
                valueFormatter: (params: GridValueFormatterParams<Date>) => {
                    return params.value == null ? "" : new Date(params.value).toLocaleDateString('en-US');
                },
            },
            {
                field: 'remainingDays',
                headerName: 'Remaining Days',
                flex: 1.5,
                renderHeader: () => (
                    <h4>Remaining Days</h4>
                ),
                renderCell: (params: GridRenderCellParams<ProjectReadOnly>) => (
                    <Stack
                        direction='row'
                        spacing={2}
                        divider={<Divider orientation="vertical" flexItem />}>
                        <ErrorOutline
                            sx={
                                { color: getBackgroundColor(remainingDays(params.row.endDate)) }
                            }
                        />
                        <span>
                            {Math.ceil(remainingDays(params.row.endDate))} 
                        </span>                                               
                    </Stack>
                ),
            },
            { 
                field: 'sponsorName', 
                headerName: 'Sponsor',
                flex: 1,
                renderHeader: () => (
                    <h4>Sponsor</h4>
                ),
            },
            {
                field: 'actions',
                headerName: 'Action',
                type: 'actions',
                width: 80,
                renderHeader: () => (
                    <h4>Actions</h4>
                ),
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
                    slots={{ toolbar: CustomToolbar }}
                    pagination
                    autoPageSize
                />
            </Box>
        </div>
    );
}

export default ProjectList;