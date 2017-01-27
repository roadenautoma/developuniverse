---
layout: post
title: "You're Measuring Your Email Nurtures Effectiveness Wrong"
description: Learn why open and click rate aren't good enough to measure email effectiveness and how you can do it better with business metrics tested by test and control groups
date: 2017-01-25 12:30
tags:
- email
- nurture
- activation
- analytics
intro: true
comments: true
share: true
---

Let's just face it, *Email is no longer what it used to be*. I receive ~100 emails daily. Some of them are from sales folks trying to get me in the phone to sell me their service, some of them are nurture campaigns from SaaS, others are weekly newsletters. I have so many that I don't know exactly how to engage with them. All of my emails are automatically "opened" by [AirMail](http://airmailapp.com/) to show me the preview, and sometimes I click them just to check them out but close them quickly after. What does this mean? It means that your open and click measurements are going to be skewed. In this post, I'll be tackling this problem together with a solution we implemented at [Auth0](https://auth0.com).

<!-- more -->

A few months ago we were really happy about our email metrics. *Our open and click rate, as well as CTR were pretty high*. They were actually higher than standard industry values, so we thought we were kicking ass. 

{% figure caption: "Regular email stats"%}
![Regular email stats](https://files.readme.io/f91d8b9-ctr-ab-50-50-example.png)
{% endfigure %}


However, at that point we realized that the *objective of the emails is to make people more active in the platform and increase awareness*. In Auth0's case, that means either getting them to come back to the dashboard, or making sure their applications have users logging in to their apps every month. By checking open and click rate, we weren't really measuring those metrics, so *we decided to use test and control group for emails*.

*Test and control groups were invented lots of years ago for medical trials*. Pharmaceuticals would give a new antibiotic to a certain percentage of people (let's say 75%) and then give nothing (a placebo) to the other 25%. Then, they'd measure the differences in the metrics they cared about from the different groups. For example, for a hair recovery pill, they'd probably test out amount and thickness of hair between groups. This way, the metrics will never be skewed since you're creating random groups which will have the same timing and some conditions.



{% figure caption: "Control & Test group explanation"%}
![Control & Test group explanation](https://i.ytimg.com/vi/GMqrOdCx4Yg/maxresdefault.jpg)
{% endfigure %}


We decided to do the same for Auth0. For each email nurture campaign we had, we decided to continue sending it for a 75% of the population, and we'd stop sending it for the remaining 25%. Then, we measured different activation metrics we cared about:
* Active users in the dashboard
* Active users using Auth0 API
* SQOs (Sales Qualified Opportunities)
* Paid
* SALs (Sales Accepted Leads)
* In danger users (users in danger of becoming inactive)
* Resurrected users (inactive users that became users again)

The results speak for themselves (I changed the numbers to not show real Auth0 values):


{% figure caption: "Control and test group data from Auth0."%}
![control test group results for Auth0](https://d.pr/i/zBMP+?a=1)
{% endfigure %}


Here you can see how the conversion rate for the control group (people who didn't get emails) is actually higher for almost all metrics than the test group. The only metric that's better in the test group is SALs. A Sales Accepted Lead for Auth0 is a lead from which we got a response (usually email) that they're interested. If we don't send emails, it makes sense to actually have less of those.

## Conclusion

*Using control and test groups, we learnt that even though our open and click rates were high, the emails we were sending made people less active in the platform*. The first time we saw this data, we couldn't believe it, but after thinking about it for a while, we realized that some of our core audience are developers and they don't like getting emails all the time. Thanks to this data, we're now working on revamping all of our email campaigns by segmenting them by persona and creating content that is useful for them. Bottomline, *make sure you don't just check open and click rates, use business metrics to measure the effectiveness of your email campaigns*.

Happy emailing :)


