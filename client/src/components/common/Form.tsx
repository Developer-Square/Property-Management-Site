import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  FormHelperText,
  TextField,
  TextareaAutosize,
  Stack,
  Select,
  MenuItem,
  Button,
} from '@pankod/refine-mui';

import { FormProps } from 'interfaces/common';
import CustomButton from './CustomButton';
import ImageView from './ImageView';
import { ArrowBackIosOutlined } from '@mui/icons-material';
import { useNavigate } from '@pankod/refine-react-router-v6';

const Form = ({
  type,
  register,
  handleSubmit,
  handleImageChange,
  formLoading,
  onFinishHandler,
  propertyImage,
  backendImages,
  setBackendImages,
  mode,
}: FormProps) => {
  const navigate = useNavigate();

  const handleRemoveImage = (img: string) => {
    // filter out the image from the images array then set the state
    const filteredImages = backendImages?.filter((image) => image !== img);
    setBackendImages(filteredImages);
  };
  return (
    <Box>
      <Stack direction='row' alignItems='center'>
        <ArrowBackIosOutlined
          sx={{
            color: mode === 'light' ? '#11142d' : '#EFEFEF',
            marginRight: '15px',
            fontSize: '19px',
            cursor: 'pointer',
          }}
          onClick={() => navigate(-1)}
        />
        <Typography
          fontSize={25}
          fontWeight={700}
          color={mode === 'light' ? '#11142d' : '#EFEFEF'}
        >
          {type} a Property
        </Typography>
      </Stack>

      <Box
        mt={2.5}
        borderRadius='15px'
        padding='20px'
        bgcolor={mode === 'light' ? '#fcfcfc' : '#1A1D1F'}
      >
        <form
          style={{
            marginTop: '20px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
          onSubmit={handleSubmit(onFinishHandler)}
        >
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: '10px 0',
                fontSize: 16,
                color: mode === 'light' ? '#11142d' : '#EFEFEF',
              }}
            >
              Enter property name
            </FormHelperText>
            <TextField
              fullWidth
              required
              id='outlined-basic'
              color='info'
              variant='outlined'
              {...register('title', { required: true })}
            />
          </FormControl>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: '10px 0',
                fontSize: 16,
                color: mode === 'light' ? '#11142d' : '#EFEFEF',
              }}
            >
              Enter Description
            </FormHelperText>
            <TextareaAutosize
              minRows={5}
              required
              placeholder='Write description'
              color='info'
              style={{
                width: '100%',
                background: 'transparent',
                fontSize: '16px',
                borderColor: 'rgba(0, 0, 0, 0.23)',
                borderRadius: 6,
                padding: 10,
                color: mode === 'light' ? '#11142d' : '#EFEFEF',
              }}
              {...register('description', { required: true })}
            />
          </FormControl>

          <Stack
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              flexDirection: { xs: 'column', sm: 'row' },
            }}
            gap={4}
          >
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: '10px 0',
                  fontSize: 16,
                  color: mode === 'light' ? '#11142d' : '#EFEFEF',
                }}
              >
                Select Property Type
              </FormHelperText>
              <Select
                variant='outlined'
                color='info'
                displayEmpty
                required
                inputProps={{ 'aria-label': 'Without label' }}
                defaultValue='apartment'
                {...register('propertyType', { required: true })}
              >
                <MenuItem value='apartment'>Apartment</MenuItem>
                <MenuItem value='villa'>Villa</MenuItem>
                <MenuItem value='farmhouse'>FarmHouse</MenuItem>
                <MenuItem value='condos'>Condos</MenuItem>
                <MenuItem value='townhouse'>Townhouse</MenuItem>
                <MenuItem value='duplex'>Duplex</MenuItem>
                <MenuItem value='studio'>Studio</MenuItem>
                <MenuItem value='chalet'>Chalet</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: '10px 0',
                  fontSize: 16,
                  color: mode === 'light' ? '#11142d' : '#EFEFEF',
                }}
              >
                Select Property Status
              </FormHelperText>
              <Select
                variant='outlined'
                color='info'
                displayEmpty
                required
                inputProps={{ 'aria-label': 'Without label' }}
                defaultValue='for-sale'
                {...register('propertyStatus', { required: true })}
              >
                <MenuItem value='for-sale'>For Sale</MenuItem>
                <MenuItem value='for-rent'>For Rent</MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: '10px 0',
                  fontSize: 16,
                  color: mode === 'light' ? '#11142d' : '#EFEFEF',
                }}
              >
                Enter property price
              </FormHelperText>
              <TextField
                fullWidth
                required
                id='outlined-basic'
                color='info'
                type='number'
                variant='outlined'
                {...register('price', { required: true })}
              />
            </FormControl>
          </Stack>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                margin: '10px 0',
                fontSize: 16,
                color: mode === 'light' ? '#11142d' : '#EFEFEF',
              }}
            >
              Enter Location
            </FormHelperText>
            <TextField
              fullWidth
              required
              id='outlined-basic'
              color='info'
              variant='outlined'
              {...register('location', { required: true })}
            />
          </FormControl>

          <Stack direction='column' gap={1} justifyContent='center' mb={2}>
            <Stack direction='row' gap={2}>
              <Typography
                color={mode === 'light' ? '#11142d' : '#EFEFEF'}
                fontSize={16}
                fontWeight={500}
                my='10px'
              >
                Property Photos
              </Typography>

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
            </Stack>
            <Typography
              fontSize={14}
              color='#808191'
              sx={{ wordBreak: 'break-all' }}
            >
              {propertyImage
                ? propertyImage.map((image) => image.name).join(', ')
                : ''}
            </Typography>
            <Stack
              gap={{ xs: 1, sm: 2 }}
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              {backendImages?.length ? (
                <ImageView
                  backendImages={backendImages}
                  handleRemoveImage={handleRemoveImage}
                />
              ) : (
                <></>
              )}
            </Stack>
          </Stack>

          <CustomButton
            type='submit'
            title={formLoading ? 'Submitting...' : 'Submit'}
            backgroundColor='#475be8'
            color='#fcfcfc'
          />
        </form>
      </Box>
    </Box>
  );
};

export default Form;
