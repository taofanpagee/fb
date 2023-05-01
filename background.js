chrome.action.onClicked.addListener(function () {
  chrome.tabs.create({ url: 'fanpage_info.html' });
});

function fetchFanpages() {
  const url = `https://graph.facebook.com/v13.0/me/accounts?fields=id,name,unread_message_count,fan_count,new_like_count,is_published&access_token=${accessToken}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayFanpages(data.data);
    })
    .catch((error) => console.error(error));
}

function displayFanpages(fanpages) {
  const fanpageTable = document.getElementById('fanpageTable');
  fanpages.forEach((fanpage, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${fanpage.id}</td>
      <td>${fanpage.name}</td>
      <td>${fanpage.unread_message_count}</td>
      <td>${fanpage.fan_count}</td>
      <td>${fanpage.new_like_count}</td>
      <td>${fanpage.is_published ? 'Công khai' : 'Không công khai'}</td>
    `;
    fanpageTable.appendChild(row);
  });
}
