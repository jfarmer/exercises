# require_relative 'binary_search_tree'

# The idea behind an AVL tree is to guarantee that the
# difference in height between any node's left and right
# sub-trees is never greater than 1.
#
# Inserting or deleting might cause this to happen, so
# after either operation we check and perform a series
# of "tree rotations" to keep the tree balanced.
#
# See: https://en.wikipedia.org/wiki/Tree_rotation
#
# This is a right rotation about B:
#   B              D
#  / \            / \
# a   D    ->    B   E
#    / \        / \
#   c   E      a   c
#
# This is a left rotation about D:
#     D          B
#    / \        / \
#   B   e  ->  A   D
#  / \            / \
# A   c          c   e
#
# There are four ways a tree can be unbalanced:
# For a visualization: https://en.wikipedia.org/wiki/Tree_rotation#/media/File:Tree_Rebalancing.gif

# This doesn't NEED to inherit from BinarySearchTree, but if
# you've already implemented it this might save you some time.
#
# Add whatever other classes you find useful.
def AVLTree(value, left = EmptyTree, right = EmptyTree)
  case value
  when AVLTree
    value
  when nil
    EmptyTree
  else
    AVLTree.new(value, left, right)
  end
end

class EmptyTree
  def self.insert(value)
    AVLTree(value)
  end

  def self.left
    EmptyTree
  end

  def self.right
    EmptyTree
  end

  def self.find(value)
    nil
  end

  def self.find_tree(value)
    nil
  end

  def self.include?(value)
    false
  end

  def self.remove(value)
    EmptyTree
  end

  def self.value
    nil
  end

  def self.height
    0
  end

  def self.empty?
    true
  end

  def self.present?
    !empty?
  end

  def self.sexp
    []
  end
end


class AVLTree
  attr_accessor :value, :left, :right

  def initialize(value, left = EmptyTree, right = EmptyTree)
    @value = value
    @left  = left
    @right = right
  end

  def empty?
    false
  end

  def present?
    !empty?
  end

  def height
    @_height ||= 1 + [left.height, right.height].max
  end

  def max
    @_max ||= right.present? ? right.max : self.value
  end

  def find_tree(value)
    case value <=> self.value
    when -1
      left.find_tree(value)
    when 0
      self
    when +1
      right.find_tree(value)
    end
  end

  def find(value)
    find_tree(value) || nil
  end

  def include?(value)
    !find(value).nil?
  end

  def insert(value)
    case value <=> self.value
    when -1
      AVLTree(self.value, left.insert(value), right).rebalance
    when 0
      self
    when +1
      AVLTree(self.value, left, right.insert(value)).rebalance
    end
  end

  def remove(value, parent = nil)
    if value < self.value
      AVLTree(self.value, self.left.remove(value), self.right).rebalance
    elsif value > self.value
      AVLTree(self.value, self.left, self.right.remove(value)).rebalance
    # Cases for when value == self.value
    elsif left.present? && right.present?
      left_max = left.max
      AVLTree(left_max, self.left.remove(left_max), self.right).rebalance
    elsif left.empty?
      right
    elsif right.empty?
      left
    end
  end

  def sexp
    if left.empty? && right.empty?
      [value]
    else
      [value, left.sexp, right.sexp]
    end
  end

  def rebalance
    root = self

    case left.height - right.height
    when +2
      if left.left.height < left.right.height
        root = AVLTree(self.value, self.left.rotate_left, self.right)
      end

      root.rotate_right
    when -2
      if right.left.height > right.right.height
        root = AVLTree(self.value, self.left, self.right.rotate_right)
      end

      root.rotate_left
    else
      root
    end
  end

  def rotate_left
    root_value  = self.value
    right_value = self.right.value
    root_left   = self.left
    right_left  = self.right.left
    right_right = self.right.right

    AVLTree(
      right_value,
      AVLTree(
        root_value,
        root_left,
        right_left
      ),
      right_right
    )
  end

  def rotate_right
    root_value = self.value
    root_right = self.right
    left_value = self.left.value
    left_left  = self.left.left
    left_right = self.left.right

    AVLTree(
      left_value,
      left_left,
      AVLTree(
        root_value,
        left_right,
        root_right
      )
    )
  end
end


if __FILE__ == $PROGRAM_NAME
  require 'pp'
  require 'benchmark'

  def rand_array(size, range)
    Array.new(size) { rand(range) }
  end

  MAX_RAND = 100000
  BASE_SIZE = 100
  ITERATIONS = 10000

  trees = (0..5).reduce({}) do |hash, k|
    size = BASE_SIZE * 10**k
    tree = rand_array(BASE_SIZE * 10**k, -MAX_RAND..MAX_RAND).reduce(EmptyTree) { |t, val| t.insert(val) }
    puts "Tree of #{size} has height #{tree.height}"

    hash.update(k => tree)
  end

  Benchmark.bmbm do |x|
    trees.each do |k, tree|
      x.report("finding in size #{BASE_SIZE * 10**k}") do
        ITERATIONS.times do
          tree.include?(rand(-MAX_RAND..MAX_RAND))
        end
      end
    end
    trees.each do |k, tree|
      x.report("inserting in size #{BASE_SIZE * 10**k}") do
        ITERATIONS.times do
          tree.insert(rand(-MAX_RAND..MAX_RAND))
        end
      end
    end
  end

  # tree = EmptyTree
  # (1...10).each do |n|
  #   tree = tree.insert(n)
  # end

  # puts PP.pp(tree.sexp, '', 10)
  # puts "Max value: #{tree.max}"

  # tree = tree.remove(5).remove(8)

  # puts PP.pp(tree.sexp, '', 10)
end
