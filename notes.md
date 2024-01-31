devdemo.neubird.web-devapp.com - source "demo" branch -> build -> s3
- automatic, every time "demo" check-in happens auto build.
 
qademo.neubird.web-devapp.com - source demo branch(codecommit) -> build -> s3.
- pull demo branch from github, but copy data folder from github to final build 
- every day morning 6 AM
 
dev.neubird.web-devapp.com - source dev branch -> build -> s3
- automatic, every time poc check in happens auto build
 
qa.neubird.web-devapp.com - source dev branch -> build -> s3.
- every day morning 6 AM
 
demo.neubird.ai - source is qa build -> s3
- this is controlled only QA certified build should move no automation 
 
dev.neubird.ai - Certified QA build from qa.neubird.web-devapp.com  
qa.neubird.ai
stg.neubird.ai
uat.neubird.ai
alpha.neubird.ai / beta.neubird.ai / prod.neubird.ai
[Major].[Minor].[Patch]
0.0.0
one more jenkins job to push code from codecommit to github
- check out codecommit (demo branch)
- check out github (demo branch)
- copy data folder codecommit to github
- git push to github