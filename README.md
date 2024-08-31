<h1 align="center">Sentiment Explorer</h1>



<h4 align="center">Concept</h4>
We live in a diverse society, where people have different opinions on many topics. But how do most people really feel about certain issues? Most of us – trapped in filter bubbles and echo chambers on social media – don't <em>really</em> have a clear view of this.
<br />
<br />
That's where this project comes in. I found a dataset with 1.6 million tweets and adapted a TextVectorization to the data to create a vocabulary. Using this adapted layer, I then created a sentiment analysis recurrent neural network (RNN) model. 
<br />
<br />
Next, I created the Sentiment Explorer web app. In the web app, users can search for any modern social issue or topic they want (example: climate change). The web app then combs through a dataset of nearly 550,000 recent tweets (posted during 2022), finds tweets with the search term, performs sentiment analysis on the filtered tweets using the RNN model, and displays how people feel about the issue. 

<br />
<br />
Sentiment Explorer provides a simple way to gage people's opinions on important issues, such as the environment, economic policies, and civil rights. If worked on further, I believe this tool could have important implications for policymakers, interest groups, and others. 
<br />
<br />



<h4 align="center">Tech Stack</h4>
<ul>
    <li>Pandas for data pre-processing</li>
    <li>TensorFlow for model creation and training</li>
    <li>Flask for the back-end (e.g. API, serving the model)</li>
    <li>React.js, Next.js, & useSWR (in TypeScript) for the web app front-end</li>
<ul>

<br />

