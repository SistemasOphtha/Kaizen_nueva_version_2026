async function main() {
  // Login
  const loginRes = await fetch('http://localhost:4001/api/auth/sign-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: 'gerencia@siev.co',
      password: 'Cmdev2023*'
    })
  });
  
  const loginData = await loginRes.json();
  const token = loginData.access_token;
  console.log('Logged in successfully, token retrieved:', token ? 'YES' : 'NO');

  // Fetch workplans
  const startDate = '2026-06-01T05:00:00.000Z';
  const endDate = '2026-06-07T00:07:11.000Z';
  
  const wpRes = await fetch(`http://localhost:4001/api/workplans?startDate=${startDate}&endDate=${endDate}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const wpData = await wpRes.json();
  console.log(`API returned ${wpData.length} workplans:`);
  wpData.forEach(w => {
    console.log(`- ID: ${w.id}, User: ${w.user.firstName} ${w.user.lastName}, Desc: ${w.description}`);
  });
}

main().catch(console.error);
