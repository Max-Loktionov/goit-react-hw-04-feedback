import { useState } from 'react';
import { Container } from './App.styled';
import Section from './Section';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Notification from './Notification';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const options = { good, neutral, bad };

  const onHandleButton = e => {
    const btnName = e.currentTarget.name;

    switch (btnName) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;

      default:
        break;
    }
  };
  const countTotalFeedback = () => {
    return Object.values(options).reduce((total, item) => total + item, 0);
  };
  const totalFeedback = countTotalFeedback();
  const countPositiveFeedbackPercentage = () => {
    return Math.round((good / totalFeedback) * 100);
  };
  const positiveFeedPerc = countPositiveFeedbackPercentage();

  return (
    <Container>
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={onHandleButton} />
      </Section>
      <Section title="Statistics">
        {totalFeedback > 0 ? (
          <Statistics
            goodStat={good}
            neutralStat={neutral}
            badStat={bad}
            totalFeedback={totalFeedback}
            positivePercentage={positiveFeedPerc}
          />
        ) : (
          <Notification message="There is no feedback"></Notification>
        )}
      </Section>
    </Container>
  );
}
