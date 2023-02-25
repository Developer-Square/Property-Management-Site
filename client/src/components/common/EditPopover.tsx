import React, { Dispatch, SetStateAction } from 'react';
import { Popover, Stack, Typography } from '@pankod/refine-mui';
import { Delete, Edit } from '@mui/icons-material';

interface IEditPopoverProps {
  popoverId: 'simple-popover' | undefined;
  anchorEl: HTMLButtonElement | null;
  setAnchorEl: Dispatch<SetStateAction<HTMLButtonElement | null>>;
  open: boolean;
  handleUpdate: () => void;
  handleDelete: () => void;
}

const EditPopover = ({
  popoverId,
  anchorEl,
  setAnchorEl,
  open,
  handleUpdate,
  handleDelete,
}: IEditPopoverProps) => {
  return (
    <>
      <span
        id={popoverId}
        style={{
          fontSize: '25px',
          cursor: 'pointer',
          padding: '0 5px 5px 5px',
          height: '50px',
        }}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
          setAnchorEl(e.currentTarget)
        }
      >
        ...
      </span>

      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Stack
          direction='row'
          gap='8px'
          sx={{ padding: '10px', cursor: 'pointer' }}
          onClick={handleUpdate}
        >
          <Edit
            sx={{
              fontSize: '20px',
              color: '#475BE8',
              fontWeight: 'bold',
            }}
          />
          <Typography fontSize={14} fontWeight={600} color='#475BE8'>
            Edit Profile
          </Typography>
        </Stack>
        <Stack
          direction='row'
          gap='8px'
          sx={{ padding: '10px', cursor: 'pointer' }}
          onClick={handleDelete}
        >
          <Delete
            sx={{ fontSize: '20px', color: '#c00', fontWeight: 'bold' }}
          />
          <Typography fontSize={14} fontWeight={600} color='#c00'>
            Delete Profile
          </Typography>
        </Stack>
      </Popover>
    </>
  );
};

export default EditPopover;
