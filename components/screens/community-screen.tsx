"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { MessageCircle, Heart, Share2, Award, ThumbsUp, Send, Users, Trophy } from "lucide-react"
import type { UserData } from "@/lib/user-data-provider"
import { useToast } from "@/components/ui/use-toast"

interface CommunityScreenProps {
  userData: UserData
}

export default function CommunityScreen({ userData }: CommunityScreenProps) {
  const { toast } = useToast()
  const [newComment, setNewComment] = useState("")
  const [activeTab, setActiveTab] = useState("feed")

  // Mock community posts
  const posts = [
    {
      id: 1,
      author: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        badge: "Expert Walker",
      },
      content:
        "Just completed my 10,000 steps goal for the 7th day in a row! The stability exercises from WalkSafe have really helped improve my balance.",
      image: "/placeholder.svg?height=200&width=400",
      likes: 24,
      comments: 5,
      shares: 2,
      time: "2 hours ago",
    },
    {
      id: 2,
      author: {
        name: "Robert Chen",
        avatar: "/placeholder.svg?height=40&width=40",
        badge: "Fall Prevention Coach",
      },
      content:
        "Tip of the day: When walking on uneven surfaces, slightly bend your knees to lower your center of gravity and improve stability. This simple adjustment can significantly reduce fall risk!",
      likes: 42,
      comments: 8,
      shares: 15,
      time: "5 hours ago",
    },
    {
      id: 3,
      author: {
        name: "Maria Garcia",
        avatar: "/placeholder.svg?height=40&width=40",
        badge: "Progress Champion",
      },
      content:
        "I've been using WalkSafe for 3 months now, and my stability score has improved from 65% to 82%! So grateful for this community and all the support.",
      likes: 36,
      comments: 12,
      shares: 4,
      time: "Yesterday",
    },
  ]

  // Mock challenges
  const challenges = [
    {
      id: 1,
      title: "7-Day Step Challenge",
      description: "Complete 5,000 steps every day for 7 consecutive days",
      participants: 248,
      progress: 71,
      daysLeft: 3,
    },
    {
      id: 2,
      title: "Balance Master",
      description: "Complete all balance exercises in the app for 5 days",
      participants: 156,
      progress: 40,
      daysLeft: 5,
    },
    {
      id: 3,
      title: "Walking Buddy",
      description: "Invite a friend to join you for a 30-minute walk",
      participants: 89,
      progress: 100,
      daysLeft: 0,
      completed: true,
    },
  ]

  // Mock leaderboard
  const leaderboard = [
    { rank: 1, name: "James Wilson", score: 9850, avatar: "/placeholder.svg?height=40&width=40" },
    { rank: 2, name: "Emma Thompson", score: 9720, avatar: "/placeholder.svg?height=40&width=40" },
    { rank: 3, name: "David Lee", score: 9540, avatar: "/placeholder.svg?height=40&width=40" },
    { rank: 4, name: "Sophia Martinez", score: 9350, avatar: "/placeholder.svg?height=40&width=40" },
    { rank: 5, name: "You", score: 9120, avatar: "/placeholder.svg?height=40&width=40", isUser: true },
    { rank: 6, name: "Michael Brown", score: 8950, avatar: "/placeholder.svg?height=40&width=40" },
    { rank: 7, name: "Olivia Davis", score: 8820, avatar: "/placeholder.svg?height=40&width=40" },
  ]

  const handlePostComment = () => {
    if (newComment.trim()) {
      toast({
        title: "Comment Posted",
        description: "Your comment has been added to the discussion",
      })
      setNewComment("")
    }
  }

  const handleLike = (postId: number) => {
    toast({
      title: "Post Liked",
      description: "You liked this post",
    })
  }

  const handleJoinChallenge = (challengeId: number) => {
    toast({
      title: "Challenge Joined",
      description: "You've successfully joined the challenge",
    })
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-blue-600">Community</h2>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="feed">
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Profile" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <Textarea placeholder="Share your walking progress or tips..." className="resize-none" />
                </div>
                <div className="flex justify-end mt-3">
                  <Button
                    onClick={() =>
                      toast({
                        title: "Post Created",
                        description: "Your post has been shared with the community",
                      })
                    }
                  >
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>

            {posts.map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * post.id }}
              >
                <Card className="mb-4">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <Avatar>
                          <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium">{post.author.name}</h3>
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full flex items-center">
                              <Award className="w-3 h-3 mr-1" />
                              {post.author.badge}
                            </span>
                            <span className="text-xs text-gray-500">• {post.time}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">{post.content}</p>
                    {post.image && (
                      <div className="rounded-lg overflow-hidden mb-3">
                        <img src={post.image || "/placeholder.svg"} alt="Post" className="w-full h-auto" />
                      </div>
                    )}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{post.likes} likes</span>
                      <span>{post.comments} comments</span>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-3 flex justify-between">
                    <Button variant="ghost" size="sm" onClick={() => handleLike(post.id)}>
                      <Heart className="w-4 h-4 mr-2" />
                      Like
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Comment
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </CardFooter>
                  {post.id === 1 && (
                    <div className="px-4 pb-4">
                      <div className="flex gap-3 mt-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Profile" />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <Input
                            placeholder="Write a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="h-9"
                          />
                        </div>
                        <Button size="sm" variant="ghost" onClick={handlePostComment}>
                          <Send className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </TabsContent>

          <TabsContent value="challenges">
            <div className="space-y-4">
              {challenges.map((challenge) => (
                <motion.div
                  key={challenge.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * challenge.id }}
                >
                  <Card className={challenge.completed ? "border-green-200 bg-green-50" : ""}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-lg font-medium">{challenge.title}</CardTitle>
                        {challenge.completed && (
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                            <Trophy className="w-3 h-3 mr-1" />
                            Completed
                          </span>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 mb-4">{challenge.description}</p>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{challenge.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${challenge.completed ? "bg-green-500" : "bg-blue-500"}`}
                            style={{ width: `${challenge.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          <span>{challenge.participants} participants</span>
                        </div>
                        {!challenge.completed && <span>{challenge.daysLeft} days left</span>}
                      </div>
                    </CardContent>
                    <CardFooter>
                      {challenge.completed ? (
                        <Button className="w-full bg-green-600 hover:bg-green-700">View Results</Button>
                      ) : (
                        <Button className="w-full" onClick={() => handleJoinChallenge(challenge.id)}>
                          Join Challenge
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Weekly Steps Leaderboard</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {leaderboard.map((user, index) => (
                    <motion.div
                      key={user.rank}
                      className={`flex items-center p-3 rounded-lg ${
                        user.isUser ? "bg-blue-50 border border-blue-200" : "bg-gray-50"
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 * index }}
                    >
                      <div className="w-8 text-center font-bold">
                        {user.rank <= 3 ? (
                          <span
                            className={`
                            inline-flex items-center justify-center w-6 h-6 rounded-full
                            ${
                              user.rank === 1
                                ? "bg-yellow-100 text-yellow-800"
                                : user.rank === 2
                                  ? "bg-gray-200 text-gray-800"
                                  : "bg-amber-100 text-amber-800"
                            }
                          `}
                          >
                            {user.rank}
                          </span>
                        ) : (
                          user.rank
                        )}
                      </div>
                      <Avatar className="mx-3">
                        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.score.toLocaleString()} steps</p>
                      </div>
                      {user.isUser && <ThumbsUp className="w-5 h-5 text-blue-600" />}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    toast({
                      title: "Leaderboard",
                      description: "View complete leaderboard and your ranking history",
                    })
                  }
                >
                  View Full Leaderboard
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
