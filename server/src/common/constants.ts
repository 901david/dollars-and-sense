export const CONFIRMATION_EMAIL_FROM = 'admin@dollars-and-sense.net';
export const CONFIRMATION_EMAIL_SUBJECT =
  'New Dollars and Sense Account Confirmation';
export const CONFIRMATION_EMAIL_HTML = (id: number) => `
<style>
      .confirm-button {
        background: lightgray;
        border-radius: 5px;
        height: 20px;
        white-space: nowrap;
        color: 'white';
        text-align: 'center';
        border: '2px solid black';
      }
    </style>
    <div>
      <h3>Welcome to Dollars and Sense</h3>
      <p>
        Welcome! You have created an account with Dollars and Sense. If you did
        not create this account please click
        <a
          href="https://136gm4r7y6.execute-api.us-west-2.amazonaws.com/dev/fraud?id=${id}"
          >here</a
        >
        to report
      </p>

      <h4>To confirm your email address please click below</h4>
      <a href="https://136gm4r7y6.execute-api.us-west-2.amazonaws.com/dev?id=${id}">
        <button aria-label="Confirm Email" type="submit" class="confirm-button">
          Confirm Email
        </button></a
      >
      <p>Thanks!</p>
      <p>Dollars and Sense Staff</p>
    </div>`;
