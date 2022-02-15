const Discord = require('discord.js')
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

const data = {
    id: process.env.DISCORD_SERVER_ID,
    token: process.env.DISCORD_CHANNEL_TOKEN
}

console.log('ZENHUB-DISCORD-INTEGRATION V1.0')
console.log('AUTHOR: MIHAI MOROSAN\n')

console.log('Creating Discord Webhook Client...')
const discordWebHook = new Discord.WebhookClient(data)
console.log('Created Discord Webhook Client\n')

console.log('Creating Express App...')
var app = express();
console.log('Created Express App\n')

var port = process.env.PORT || '6000'

http.createServer(app).listen(port, function() {
  console.log('App is listening on 6000\n');
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.post('*', function(req, res) {
  console.log('Received from ZenHub:')
  console.dir(req.body);

  if (req.body.type === 'issue_transfer')
    sendIssueTransfer(req.body)
  
  else if (req.body.type === 'issue_reprioritized')
    sendIssueReprioritized(req.body)

  else if (req.body.type === 'estimate_set')
    sendEstimateSet(req.body)

  else if (req.body.type === 'estimate_cleared')
    sendEstimateCleared(req.body)
})

function sendIssueTransfer(body){
  var msg = {
    'attachments': [{
      'pretext': '**Issue Transfer**',
      'text': 'Issue "' + body.issue_title
        + '" was moved from "' + body.from_pipeline_name
        + '" to "' + body.to_pipeline_name
        + '" by ' + body.user_name + '.\n' + body.github_url,
      'color': '#F0F',
      'footer_icon': 'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/v1465258163/u25neqcxwvia6kkbxnrg.jpg',
      'footer': 'Repo: ' + body.repo
        + ' | Workspace: ' + body.workspace_name,
      'ts': Date.now() / 1_000
    }]
  }

  console.log('Sending to Discord: ')
  console.dir(msg)
  discordWebHook.sendSlackMessage(msg).catch(console.error);
  console.log('Sent to Discord')
}

function sendIssueReprioritized(body){
  var msg = {
    'attachments': [{
      'pretext': '**Issue Reprioritized**',
      'text': 'Issue "' + body.issue_title
        + '" was reprioritized from "' + body.from_position
        + '" to "' + body.to_position
        + '" by ' + body.user_name  
        + ' in "' + body.to_pipeline_name + '".\n' + body.github_url,
      'color': '#F0F',
      'footer_icon': 'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/v1465258163/u25neqcxwvia6kkbxnrg.jpg',
      'footer': 'Repo: ' + body.repo
        + ' | Workspace: ' + body.workspace_name,
      'ts': Date.now() / 1_000
    }]
  }

  console.log('Sending to Discord: ')
  console.dir(msg)
  discordWebHook.sendSlackMessage(msg).catch(console.error);
  console.log('Sent to Discord')
}

function sendEstimateSet(body){
  var msg = {
    'attachments': [{
      'pretext': '**Estimate Set**',
      'text': 'Estimate set for "' + body.issue_title
        + '" at ' + body.estimate
        + ' story points by ' + body.user_name
        + '.\n' + body.github_url,
      'color': '#F0F',
      'footer_icon': 'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/v1465258163/u25neqcxwvia6kkbxnrg.jpg',
      'footer': 'Repo: ' + body.repo
        + ' | Workspace: ' + body.workspace_name,
      'ts': Date.now() / 1_000
    }]
  }

  console.log('Sending to Discord: ')
  console.dir(msg)
  discordWebHook.sendSlackMessage(msg).catch(console.error);
  console.log('Sent to Discord')
}

function sendEstimateCleared(body){
  var msg = {
    'attachments': [{
      'pretext': '**Estimate Cleared**',
      'text': 'Estimate cleared for "' + body.issue_title
        + '" by ' + body.user_name  
        + '.\n' + body.github_url,
      'color': '#F0F',
      'footer_icon': 'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/v1465258163/u25neqcxwvia6kkbxnrg.jpg',
      'footer': 'Repo: ' + body.repo
        + ' | Workspace: ' + body.workspace_name,
      'ts': Date.now() / 1_000
    }]
  }
  
  console.log('Sending to Discord: ')
  console.dir(msg)
  discordWebHook.sendSlackMessage(msg).catch(console.error);
  console.log('Sent to Discord')
}