class CustomIdentifier {
  static generate() {
    const random = [...Array(5)]
      .map(i => (~~(Math.random() * 36)).toString(36))
      .join("")
      .toUpperCase();
    const fingerprint = parseInt(
      window.navigator.userAgent.replace(/\D+/g, "") / 100000000000000,
      10
    );
    const timestamp = parseInt(new Date().getTime() / 1000, 10);
    return `${fingerprint}-${timestamp}-${random}`;
  }
}

export default CustomIdentifier;
