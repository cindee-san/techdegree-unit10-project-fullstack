

export default class Data {
  
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
  
      const url = "localhost:5000/api" + path;
    
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      };
  
      if (body !== null) {
        options.body = JSON.stringify(body);
      }
 
      if (requiresAuth) { 
        
        const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
        
        options.headers['Authorization'] = `Basic ${encodedCredentials}`;
      }
      
      return fetch(url, options);
    }
  
    
    async getUser(username, password) {
      
      const response = await this.api(`/users`, 'GET', null, true, { username, password });
      
      if (response.status === 200) {
        return response.json().then(data => data);
      }
      else if (response.status === 401) {
        return null;
      }
      else {
        throw new Error();
      }
    }

  }
  