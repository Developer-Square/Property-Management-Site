import React, { SetStateAction } from 'react';

import {
  FormControl,
  FormHelperText,
  TextField,
  Select,
  MenuItem,
  Button,
  Stack,
  Box,
  Typography,
} from '@pankod/refine-mui';
import ImageView from 'components/common/ImageView';

const TextInput = ({
  title,
  type,
  fieldValue,
  register,
  placeholder,
}: {
  title: string;
  type: string;
  fieldValue: string;
  register: any;
  placeholder?: string;
}) => (
  <FormControl
    sx={{
      flex: 1,
    }}
  >
    <FormHelperText
      sx={{
        fontWeight: 500,
        margin: '10px 0',
        fontSize: 16,
        color: '#11142d',
      }}
    >
      {title}
    </FormHelperText>
    <TextField
      type={type}
      required
      id='outlined-basic'
      color='info'
      variant='outlined'
      placeholder={placeholder}
      {...register(fieldValue, { required: true })}
    />
  </FormControl>
);

interface ICreateAgentForm {
  register: any;
  handleImageChange: (file: File) => void;
  propertyImage?: { name: string; url: string };
  profileUrl?: string;
  setProfileUrl?: React.Dispatch<SetStateAction<string>>;
}

const CreateAgentForm = ({
  register,
  propertyImage,
  handleImageChange,
  profileUrl,
  setProfileUrl,
}: ICreateAgentForm) => {
  return (
    <form
      style={{
        marginTop: '20px',
        width: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <Stack width='100%'>
        <TextInput
          title={'Username'}
          fieldValue={'name'}
          register={register}
          type='text'
        />
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} gap='20px'>
        <TextInput
          title={'Phone Number'}
          fieldValue={'phoneNumber'}
          register={register}
          type='number'
          placeholder='+254732934359'
        />
        <TextInput
          title={'Properties'}
          fieldValue={'properties'}
          register={register}
          type='number'
          placeholder='23'
        />
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} gap='20px'>
        <FormControl sx={{ flex: 1 }}>
          <FormHelperText
            sx={{
              fontWeight: 500,
              margin: '10px 0',
              fontSize: 16,
              color: '#11142d',
            }}
          >
            Gender
          </FormHelperText>
          <Select
            variant='outlined'
            color='info'
            displayEmpty
            required
            inputProps={{ 'aria-label': 'Without label' }}
            defaultValue='male'
            {...register('gender', { required: true })}
          >
            <MenuItem value='male'>Male</MenuItem>
            <MenuItem value='female'>Female</MenuItem>
            <MenuItem value='rather-not-say'>Rather Not Say</MenuItem>
          </Select>
        </FormControl>
        <TextInput
          title={'Email'}
          fieldValue={'email'}
          register={register}
          type='text'
        />
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} gap='20px'>
        <TextInput
          title={'Country'}
          fieldValue={'country'}
          register={register}
          type='text'
        />
        <Box sx={{ flex: 1 }}>
          <Typography color='#11142d' fontSize={16} fontWeight={500} my='10px'>
            Property Photos
          </Typography>

          <Typography
            fontSize={14}
            color='#808191'
            sx={{ wordBreak: 'break-all' }}
          >
            {propertyImage?.name}
          </Typography>
          {profileUrl?.length ? (
            <ImageView
              backendImages={[profileUrl]}
              // @ts-ignore
              handleRemoveImage={() => setProfileUrl('')}
            />
          ) : (
            <></>
          )}

          <Button
            component='label'
            sx={{
              width: 'fit-content',
              color: '#2ed480',
              textTransform: 'capitalize',
              fontSize: 16,
            }}
          >
            Upload *
            <input
              hidden
              accept='image/*'
              type='file'
              onChange={(e) => {
                // @ts-ignore
                handleImageChange(e.target.files[0]);
              }}
            />
          </Button>
        </Box>
      </Stack>
    </form>
  );
};

export default CreateAgentForm;
