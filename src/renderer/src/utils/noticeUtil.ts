export const notice = (title: string, content: string): void => {
  if(undefined !== window.Notification) {
    Notification.requestPermission().then(permission => {
      if(permission == 'granted') { // 同意接收通知
        const notification = new Notification(title, {
          body: content
          //icon: iconurl
        });
        notification.onclick = () => {

        };
      }
    });
  }
};
