export const validateEnv = (description: string, envVariable?: string) => {
  if (!envVariable) {
    console.error(`Please add the environment variable: ${description}`);
    process.exit(1);
  } else {
    return envVariable;
  }
};

export const propertyReferralsInfo = [
  {
    title: 'Social Media',
    percentage: 64,
    color: '#6C5DD3',
  },
  {
    title: 'Marketplace',
    percentage: 40,
    color: '#7FBA7A',
  },
  {
    title: 'Websites',
    percentage: 50,
    color: '#FFCE73',
  },
  {
    title: 'Digital Ads',
    percentage: 80,
    color: '#FFA2C0',
  },
  {
    title: 'Others',
    percentage: 15,
    color: '#F45252',
  },
];

export const serverUrl = validateEnv('Server URL', process.env.REACT_APP_BACKEND_URL);
