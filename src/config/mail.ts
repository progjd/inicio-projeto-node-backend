interface IMailConfig{
  driver: 'ethereal' | 'ses';

  defaults:{
    from:{
      name: string;
      email: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  
  defaults: {
    from:{
      email: 'diego@rocketseat.com.br',
      name: 'Joao do ouro',
    }
  }
} as IMailConfig;