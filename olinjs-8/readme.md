# Week 8+ Git Practice

Because waiting to learn git until a merge goes terribly will be the worst experience ever.

## Git Merging

1. Clone this repo. Don't fork it. `git clone`
2. Edit `index.html` to display your name instead of one of the options on the nav bar. Ex: Change "Home" to "Jia" or "TV & Video" to "Jia".
3. Now type in `git merge origin/health`. This repo has 2 different branches, the master branch and the "health" branch. Don't worry about branches for now, we're just using this in order to practice merging.
4. Alright, so you can't merge because you've changed the file. You want to stash your change with `git stash`
5. Now try and re-merge. (In your project teams this would be a git pull, but no one else has touched your repo for this excercise so we'll fake some changes by looking at code from another branch)
6. Now pop your stash with `git stash pop`
7. Fix the merge conflicts. Make it so that your name is still displayed as a button. You shouldn't have to type anything for this part... You just need to decide which parts of the merge you want to keep and which part you want to delete.

#Week 8 - Stretch before you sprint
So you are starting to code on your team What do you do?

First, add your friends to your repository so they can push (settings/collaboration)

Now what? 
* Plan ahead to split up coding between different members
* One view per person? 
* Push often pull often.
* Use .gitignore files [example](https://github.com/github/gitignore/blob/master/Node.gitignore)
* Use `git status` to see what is added, changed or unchanged. 


##Git
Confused? Checkout the cheat sheet: [Git Cheat Sheet](http://www.cheat-sheets.org/saved-copy/git-cheat-sheet.pdf)

###Two Quick Scenarios

1. ####```error: Entry foo would be overwritten by merge```
    At some point, you will see something like:
        `error: Entry foo would be overwritten by merge. Cannot merge. (Changes in staging area)`
    This means: something changed both on the remote and locally.
    
    __The solution__:
    
    1. Save your changes locally (```git stash```)
    2. Pull the new changes from remote (```git pull```)
    3. Merge your changes in: (```git stash pop```)
    4. Commit your changes: (```git commit -am "merged remote changes"```)



2. ####```CONFLICT (content): Merge conflict in <fileName>```
    At some point, you will see something like:
    ```CONFLICT (content): Merge conflict in <fileName>
    Automatic merge failed; fix conflicts and then commit the result.```
    
    This means that Git does not know how to merge a change for you, and will ask you to merge yourself. This commonly happens when two people edit the same portion of the same file.
    
    __The solution__:
    Install a mergetool, try meld on ubuntu (```sudo apt-get install meld```), to help you visualize the differences between the files.
    
    Or, manually edit the resulting file and mark it as merged. The file in question will look similar to:
    
        <<<<<<< HEAD:mergetest
        This is was my cool change
        =======
        This was the potentially even cooler change on Github or the remote
        >>>>>>> 4e2b407f501b68f85FAKEHASHfffa0224b9b78:mergetest
    
    
    To resolve this error, manually remove the shenanigans and replace it with whichever line, or groups of lines you want. I.e.
    
        This third cool change was better than both my change, and the remote change, it ROCKED.
    
    Add the file and commit, and it will be marked as resolved:
        git add fileName
        git commit -am "resolved merge error and added snark"
    
    Another common option is to select their commits, or your own, i.e.  ```git checkout --ours filename.c```or ```git checkout --theirs filename.c```
