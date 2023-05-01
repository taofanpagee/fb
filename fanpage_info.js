const appID = '';
const accessToken = '';

async function getPages(accessToken, after) {
  let url = `https://graph.facebook.com/v16.0/me/accounts?fields=name,fan_count,category,link,new_like_count,unread_message_count,conversations_unread_count&limit=10&access_token=${accessToken}`;

  if (after) {
    url += `&after=${after}`;
  }

  const response = await fetch(url);
  const data = await response.json();
  console.log('Dữ liệu trả về từ API:', data); // Thêm dòng này

  const pages = data.data;

  if (data.paging && data.paging.next) {
    const nextPages = await getPages(accessToken, data.paging.cursors.after);
    return pages.concat(nextPages);
  } else {
    return pages;
  }
}

async function loadFanpages(appID, appSecret, accessToken) {
  try {
    const pages = await getPages(accessToken);
    if (pages && Array.isArray(pages)) {
      displayFanpageInfo(pages);
    } else {
      console.error('Dữ liệu trả về không hợp lệ:', pages);
    }
  } catch (error) {
    console.error(error);
  }
}


// Import file display_info.js
const script = document.createElement('script');
script.src = 'display_info.js';
document.head.appendChild(script);

// Lắng nghe sự kiện click vào nút Load để tải danh sách fanpage
document.getElementById('loadButton').addEventListener('click', () => {
  const appID = document.getElementById('appID').value;
  const appSecret = document.getElementById('appSecret').value;
  const accessToken = document.getElementById('accessToken').value;

  if (!appID || !appSecret || !accessToken) {
    alert('Vui lòng nhập đầy đủ thông tin.');
    return;
  }

  loadFanpages(appID, appSecret, accessToken);
});